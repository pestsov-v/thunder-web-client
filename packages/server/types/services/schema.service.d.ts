import type { IAbstractService } from './abstract.service';

export type ISchemaService = IAbstractService;

export namespace NSchemaService {
  export type Config = {
    schemaEntrypoint: string;
  };
}
