import { injectable } from '@Edge/Package';
import { AbstractService } from './abstract.service';

import type { NestedObject } from '@Utility/Types';
import type { IDiscoveryService, NDiscoveryService } from '@Edge/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;
  private _CONFIG: NDiscoveryService.EnvsConfig | undefined;

  protected init(): boolean {
    if (!process.env.NEXT_PUBLIC_CLIENT_ENVS) {
      throw new Error('Client environments not set.');
    }

    this._CONFIG = JSON.parse(process.env.NEXT_PUBLIC_CLIENT_ENVS);
    return true;
  }

  protected destroy(): void {
    this._CONFIG = undefined;
  }

  private get _config(): NDiscoveryService.EnvsConfig {
    if (!this._CONFIG) {
      throw new Error('Environment variables not set.');
    }
    return this._CONFIG;
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

  protected _get<T>(name: string, defaultValue?: T): T {
    const names = name.split('.');

    let record: NestedObject | string = this._config;
    for (const key of names) {
      if (record && typeof record === 'object' && key in record) {
        record = record[key];
      } else {
        record = key;
      }
    }

    if (record) {
      if (defaultValue) {
        return typeof record === 'undefined' ? defaultValue : record;
      } else {
        return record;
      }
    } else {
      throw new Error(`Variable "${name}" not found`);
    }
  }
}
