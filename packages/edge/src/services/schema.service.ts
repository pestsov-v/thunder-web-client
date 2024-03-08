import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { SCHEMA_SERVICES } from '../common';

import { AbstractService } from './abstract.service';

import type { ISchemaLoader, ISchemaService, NSchemaService, ServiceStructure } from '@Edge/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected _SERVICE_NAME = SchemaService.name;
  private _SCHEMA: NSchemaService.Services | undefined;

  constructor(
    @inject(EdgeSymbols.SchemaLoader)
    private readonly _schemaLoader: ISchemaLoader
  ) {
    super();
  }

  public get services(): NSchemaService.Services {
    if (!this._SCHEMA) {
      throw new Error('Schema collection not initialize.');
    }

    return this._SCHEMA;
  }

  private get _schemaServices(): ServiceStructure[] {
    if (!SCHEMA_SERVICES || SCHEMA_SERVICES.length === 0) {
      throw new Error('Schema service array is empty');
    }

    return SCHEMA_SERVICES;
  }

  protected init(): boolean {
    try {
      this._schemaLoader.init();
      this._schemaLoader.setBusinessLogic(this._schemaServices);

      this._SCHEMA = this._schemaLoader.services;

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected destroy(): void {
    this._SCHEMA = undefined;
    this._schemaLoader.destroy();
  }
}
