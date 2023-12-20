import { injectable } from '@Edge/Package';
import { AbstractService } from './abstract.service';
import { ISchemaService, NSchemaService } from '@Edge/Types';

@injectable()
export class SchemaService extends AbstractService implements ISchemaService {
  protected _SERVICE_NAME = SchemaService.name;
  public schema: NSchemaService.Schema | undefined;

  protected init(): boolean {
    this.schema = new Map<string, NSchemaService.Domain>();

    return true;
  }

  protected destroy(): void {
    this.schema = undefined;
  }
}
