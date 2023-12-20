import { injectable } from '@Edge/Package';

import type { ISchemaLoader } from '@Edge/Types';
import { NSchemaService } from '@Edge/Types';

@injectable()
export class SchemaLoader implements ISchemaLoader {
  private _SCHEMA: NSchemaService.Schema | undefined;

  public init(): void {
    this._SCHEMA = new Map<string, NSchemaService.Domain>();
  }

  public destroy(): void {
    this._SCHEMA = undefined;
  }

  public get isDefine(): boolean {
    return typeof this._SCHEMA !== 'undefined';
  }

  public get schema(): NSchemaService.Schema {
    if (!this._SCHEMA) {
      throw new Error('Schema collection not initialize.');
    }

    return this._SCHEMA;
  }

  public setDomain(name: string): void {
    const domain = this.schema.get(name);
    if (!domain) {
      this.schema.set(name, {});
    } else {
      throw new Error(`Domain with name "${name}" has been exists early`);
    }
  }
}
