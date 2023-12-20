import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import type { IInitiator, ISchemaService } from '@Edge/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {}

  public start(): void {
    this._schemaService.start();
  }

  public stop(): void {
    console.log('stop');
  }
}
