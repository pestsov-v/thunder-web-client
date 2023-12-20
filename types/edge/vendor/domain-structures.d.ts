import type { EnvironmentKind, HttpMethod } from '@Utility/Types';
import { NSchemaService } from '@Edge/Types';

export type RouterStructure<T extends string> = {
  [key in T]: {
    [key in HttpMethod]?: {
      environment: EnvironmentKind;
      service: string;
      domain: string;
      isPrivateUser?: boolean;
      isPrivateOrganization?: boolean;
    };
  };
};

export type DictionaryStructure<L extends string, D extends NSchemaService.Dictionary> = {
  language: L;
  dictionary: D;
};

export type DomainDocuments = {
  router?: RouterStructure<string>;
  dictionaries?:
    | DictionaryStructure<string, NSchemaService.Dictionary>
    | DictionaryStructure<string, NSchemaService.Dictionary>[];
};

export type CollectorStructure = {
  domain: string;
  documents: DomainDocuments;
};
