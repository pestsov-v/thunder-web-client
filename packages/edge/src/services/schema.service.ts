import { injectable, inject } from '@Edge/Package';
import { MetadataKeys } from '../common';
import { EdgeSymbols } from '@Edge/Symbols';

import { AbstractService } from './abstract.service';

import type { IDiscoveryService, ISchemaLoader, ISchemaService, NSchemaService } from '@Edge/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected _SERVICE_NAME = SchemaService.name;
  private _SCHEMA: NSchemaService.Schema | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SchemaLoader)
    private readonly _schemaLoader: ISchemaLoader
  ) {
    super();
  }

  public get schema(): NSchemaService.Schema {
    if (!this._SCHEMA) {
      throw new Error('Schema collection not initialize.');
    }

    return this._SCHEMA;
  }

  protected init(): boolean {
    this._schemaLoader.init();
    Reflect.defineMetadata(MetadataKeys.SchemaLoader, this._schemaLoader, Reflect);

    try {
      this._SCHEMA = this._schemaLoader.schema;

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected destroy(): void {
    this._SCHEMA = undefined;

    this._schemaLoader.destroy();

    Reflect.deleteMetadata(MetadataKeys.SchemaLoader, Reflect);
    Reflect.getMetadataKeys(Reflect).forEach((key) => Reflect.deleteMetadata(key, Reflect));
  }
}
