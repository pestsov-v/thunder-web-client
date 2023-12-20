import { IAbstractService } from './abstract.service';

export interface ISchemaService extends IAbstractService {
  readonly schema: NSchemaService.Schema | undefined;
}

export namespace NSchemaService {
  export type Domain = {};
  export type Schema = Map<string, Domain>;
}
