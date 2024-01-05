import type { IAbstractService } from './abstract.service';

export type ISchemaService = IAbstractService;

export namespace NSchemaService {
  export type Config = {
    schemaDir: string;
    pagesDir: string;
    entryPoint: string;
  };
}
