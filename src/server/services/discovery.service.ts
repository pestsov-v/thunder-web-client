import { config, injectable, fse, fsp, path, os } from '@Server/Package';
import { AbstractService } from './abstract.service';

import type { Config } from '@Server/Package/Types';
import type { IDiscoveryService } from '@Server/Types';
import process from 'process';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;
  protected readonly _discoveryService = this;
  protected readonly _loggerService = undefined;
  private readonly _CONFIG_NAME: string = 'config';

  private _CONFIG: Config.IConfig | undefined;
  private _PROFILE: string | undefined;
  private _NODE_ENV: string | undefined;
  private _SERVER_TAG: string | undefined;
  private _externalConfig: Record<string, unknown> | undefined;

  protected async init(): Promise<boolean> {
    this._CONFIG = config;
    this._PROFILE = process.env.SCHEMA_PROFILE ?? 'default';
    this._NODE_ENV = process.env.NODE_ENV ?? 'development';
    this._SERVER_TAG = process.env.SERVER_TAG ?? 'default_visualizer_01';

    try {
      await this._setConfigurations();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected async destroy(): Promise<void> {
    if (this._CONFIG) this._CONFIG = undefined;
    this._PROFILE = undefined;
    this._NODE_ENV = undefined;
    this._SERVER_TAG = undefined;
  }

  private get _config(): Config.IConfig {
    if (!this._CONFIG) {
      throw new Error('Config provider not initialize.');
    }

    return this._CONFIG;
  }

  public get serverTag(): string {
    if (!this._SERVER_TAG) {
      throw new Error('Server tag is undefined.');
    }

    return this._SERVER_TAG;
  }

  public get nodeEnv(): string | 'production' {
    return process.env.NODE_ENV;
  }

  private async _setConfigurations(): Promise<void> {
    try {
      await this._setExternalConfig();
      await this._setInternalConfig();
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _setExternalConfig(): Promise<void> {
    const externalConfigPath = `${os.homedir()}/.thunder/${this._PROFILE}/web-client.${
      this._NODE_ENV
    }.config.json`;

    console.log(externalConfigPath);

    let msg: string;
    try {
      if (await fse.pathExists(externalConfigPath)) {
        msg = 'The configuration of the external file is written in environment variables';
        const config = await fsp.readFile(`${externalConfigPath}`, 'utf-8');
        this._externalConfig = JSON.parse(config);
      } else {
        msg = 'The configuration of the external file is not written in environment variables';
      }
      console.log(msg);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _setInternalConfig(): Promise<void> {
    const internalConfigPath = process.cwd() + '/configs';

    const configs: { [key: string]: unknown } = {};
    let msg: string;
    try {
      if (await fse.pathExists(internalConfigPath)) {
        msg = 'The configuration of the internal files is written in environment variables';
        const files = await fsp.readdir(internalConfigPath);

        for (const file of files) {
          const [module, mode] = file.split('.');
          if (mode !== this._NODE_ENV || path.extname(file) !== '.json') return;

          const config = await fsp.readFile(`${internalConfigPath}/${file}`, 'utf-8');
          configs[module] = JSON.parse(config);
        }
      } else {
        msg = 'The configuration of the internal files is written in environment variables';
      }

      const config = this._config.util.extendDeep(configs, this._externalConfig);
      if ('web-client' in config) {
        await fse.writeFile(
          `${process.cwd()}/.env.local`,
          `NEXT_PUBLIC_CLIENT_ENVS=${JSON.stringify(config.client)}`
        );
        delete config.client;
      }

      this._config.util.setModuleDefaults(this._CONFIG_NAME, config);
      console.log(msg);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public getMandatory<T>(name: string): T {
    const variable = this._get<T>(name);
    if (typeof variable === 'undefined' || variable === '') {
      throw new Error(`Environment variable "${name}" not found`);
    }

    return variable;
  }

  public getString(name: string, def: string): string {
    const variable = this._get<unknown>(name, def);
    if (typeof variable !== 'string') {
      try {
        return String(variable);
      } catch {
        return def;
      }
    }
    return variable;
  }

  public getNumber(name: string, def: number): number {
    const variable = this._get<unknown>(name, def);

    if (typeof variable !== 'number') {
      try {
        return Number(variable);
      } catch {
        return def;
      }
    }
    return variable;
  }

  public getBoolean(name: string, def: boolean): boolean {
    const variable = this._get<unknown>(name, def);
    if (typeof variable !== 'boolean') {
      try {
        return Boolean(variable);
      } catch {
        return def;
      }
    }
    return variable;
  }

  public getArray<T>(name: string, def: Array<T>): Array<T> {
    const variable = this._get<Array<T>>(name, def);

    if (typeof variable !== 'object') {
      try {
        return Array(variable);
      } catch {
        return def;
      }
    }
    return variable;
  }

  private _get<T>(name: string, defaultValue?: T): T {
    const value = this._config.get<T>(`config.${name}`);
    if (typeof value === 'undefined' || typeof value === null) {
      if (!defaultValue) {
        throw new Error(`Environment variable "${name}" not found`);
      } else {
        return defaultValue;
      }
    } else {
      return value;
    }
  }

  public async getCertificateBuffer(path: string): Promise<Buffer> {
    try {
      return this._getEnvBuffer(path);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async getCertificateString(path: string): Promise<string> {
    try {
      const buffer = await this._getEnvBuffer(path);
      return buffer.toString('utf-8');
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  private async _getEnvBuffer(path: string): Promise<Buffer> {
    const variable = this._get<string>(`config.${path}`);
    if (!variable) {
      throw new Error(`Could not found certificate in path "${path}"`);
    }
    try {
      return await fsp.readFile(variable);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
