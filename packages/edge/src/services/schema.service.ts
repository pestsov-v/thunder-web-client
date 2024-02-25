import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';

import { AbstractService } from './abstract.service';

import type { IDiscoveryService, ISchemaService, NSchemaService } from '@Edge/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected _SERVICE_NAME = SchemaService.name;
  private _SCHEMA: NSchemaService.Services | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService
  ) {
    super();
  }

  public get services(): NSchemaService.Services {
    if (!this._SCHEMA) {
      throw new Error('Schema collection not initialize.');
    }

    return this._SCHEMA;
  }

  protected init(): boolean {
    try {
      console.log('WEB_CLIENT_SERVICES', this._SCHEMA);

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected destroy(): void {
    this._SCHEMA = undefined;
  }
}
