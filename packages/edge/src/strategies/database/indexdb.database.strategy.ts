import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';

import type { IDatabaseStrategy, IDiscoveryService, NDatabaseStrategy } from '@Edge/Types';

@injectable()
export class IndexDBDatabaseStrategy implements IDatabaseStrategy {
  private _CONFIG: NDatabaseStrategy.Config | undefined;
  private _DB_REQUEST: IDBOpenDBRequest | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService
  ) {}

  private _setConfig(): void {
    this._CONFIG = {
      enable: this._discoveryService.getBoolean('strategies.database.enable', false),
      defaultVersion: this._discoveryService.getNumber('strategies.database.defaultVersion', 1),
      name: this._discoveryService.getString('strategies.database.name', 'services'),
    };
  }

  private get _config(): NDatabaseStrategy.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  private get _dbRequest(): IDBOpenDBRequest {
    if (!this._DB_REQUEST) {
      throw new Error('IndexDB database not open.');
    }

    return this._DB_REQUEST;
  }

  private get _indexDb(): IDBFactory {
    return indexedDB;
  }

  public init(): void {
    this._setConfig();

    this._DB_REQUEST = this._indexDb.open(this._config.name, this._config.defaultVersion);
  }
}