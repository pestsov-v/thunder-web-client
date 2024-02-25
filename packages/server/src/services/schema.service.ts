import { injectable, inject } from '@Server/Package';
import { AbstractService } from './abstract.service';
import { ServerSymbols } from '@Server/Symbols';

import type {
  IDiscoveryService,
  ILoggerService,
  ISchemaService,
  NSchemaService,
} from '@Server/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected readonly _SERVICE_NAME = SchemaService.name;
  private _CONFIG: NSchemaService.Config | undefined;

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
      schemaEntrypoint: this._discoveryService.getString(
        'services.schema.schemaEntrypoint',
        process.cwd() + '/src/web-client.ts'
      ),
    };
  }

  private get _config(): NSchemaService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  protected async init(): Promise<boolean> {
    this._setConfig();

    try {
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected destroy(): Promise<void> {
    return Promise.resolve(undefined);
  }
}
