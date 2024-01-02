import type { IAbstractService } from '@Server/Types';

export type ISchemaService = IAbstractService;

export namespace NSchemaService {
  export type Config = {
    schemaDir: string;
    pagesDir: string;
    entryPoint: string;
  };
}
