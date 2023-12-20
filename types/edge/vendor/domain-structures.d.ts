import type { EnvironmentKind, HttpMethod, UnknownObject } from '@Utility/Types';
import { NSchemaService } from '@Edge/Types';
import { FC } from 'react';

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

export type AliasDictionaryStructure = DictionaryStructure<string, NSchemaService.Dictionary>;
export type AliasDictionaryStructures = DictionaryStructure<string, NSchemaService.Dictionary>[];

export type ViewStructure<N extends string, P> = {
  name: N;
  view: FC<P>;
};

export type AliasViewStructure = ViewStructure<string, UnknownObject>;
export type AliasViewStructures = ViewStructure<string, UnknownObject>[];

export type DomainDocuments = {
  router?: RouterStructure<string>;
  dictionaries?: AliasDictionaryStructure | AliasDictionaryStructures;
  views?: AliasViewStructure | AliasViewStructures;
};

export type CollectorStructure = {
  domain: string;
  documents: DomainDocuments;
};
