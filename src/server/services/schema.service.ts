import { injectable, inject, fse } from '@Server/Package';
import { ServerSymbols } from '@Server/Symbols';
import { AbstractService } from './abstract.service';

import { IDiscoveryService, ILoggerService, ISchemaService, NSchemaService } from '@Server/Types';
import process from 'process';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME = SchemaService.name;
  private _CONFIG: NSchemaService.Config | undefined;
  private readonly _rootPagesDir: string = process.cwd() + '/src/pages';

  constructor(
    @inject(ServerSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(ServerSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService
  ) {
    super();
  }

  private _setConfig() {
    this._CONFIG = {
      schemaDir: this._discoveryService.getMandatory('server.services.schema.schemaDir'),
      pagesDir: this._discoveryService.getMandatory('server.services.schema.pagesDir'),
      entryPoint: this._discoveryService.getMandatory('server.services.schema.entryPoint'),
    };
  }

  private get _config(): NSchemaService.Config {
    if (!this._CONFIG) {
      throw new Error('Service configuration not set.');
    }

    return this._CONFIG;
  }

  protected async init(): Promise<boolean> {
    this._setConfig();

    try {
      await this._copyPages();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected async destroy(): Promise<void> {
    this._CONFIG = undefined;
  }

  private async _copyPages(): Promise<void> {
    try {
      await import(this._config.entryPoint);
    } catch (e) {
      console.error(e);
      throw e;
    }

    if (await fse.pathExists(this._config.pagesDir)) {
      if (this._discoveryService.nodeEnv !== 'production') {
        await this._clearAndCopyPagesDir();
      } else {
        await fse.copy(this._config.pagesDir, this._rootPagesDir);
      }
    } else {
      throw new Error(`Pages directory from path "${this._config.pagesDir}" not exists.`);
    }
  }

  private async _clearAndCopyPagesDir(): Promise<void> {
    try {
      await fse.emptydir(this._rootPagesDir);
      await fse.copy(this._config.pagesDir, this._rootPagesDir);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
