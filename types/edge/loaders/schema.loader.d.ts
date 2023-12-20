import type { NSchemaService } from '../services';
import type { DictionaryStructure, RouterStructure } from '@Vendor/Types';

export interface ISchemaLoader {
  readonly isDefine: boolean;
  readonly schema: NSchemaService.Schema;

  init(): void;
  destroy(): void;
  setDomain(name: string): void;
  setRouter(domain: string, routes: RouterStructure<string>): void;
  setDictionaries(
    domain: string,
    dictionaries:
      | DictionaryStructure<string, NSchemaService.Dictionary>
      | DictionaryStructure<string, NSchemaService.Dictionary>[]
  ): void;
}
