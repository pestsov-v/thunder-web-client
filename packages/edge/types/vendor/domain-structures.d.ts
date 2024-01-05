import type { FC } from 'react';
import type { NSchemaService, NSessionService } from '../services';
import type { EnvironmentKind, HttpMethod, UnknownObject } from '../../common';

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

export type WsListenerStructure<T extends string = string> = {
  [key in T]: {
    type: NSessionService.ClientEventType | NSessionService.ClientEventType[];
    handler: NSchemaService.WsListener;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
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
  View: FC<P>;
};

export type AliasViewStructure = ViewStructure<string, UnknownObject>;
export type AliasViewStructures = ViewStructure<string, UnknownObject>[];

export type ControllerStructure<T extends string> = {
  [key in T]: NSchemaService.ControllerHandler;
};

export type DomainDocuments = {
  router?: RouterStructure<string>;
  controller?: ControllerStructure<string>;
  wsListeners?: WsListenerStructure<string>;
  dictionaries?: AliasDictionaryStructure | AliasDictionaryStructures;
  views?: AliasViewStructure | AliasViewStructures;
};

export type CollectorStructure = {
  domain: string;
  documents: DomainDocuments;
};

export type StoreStructure<T extends string> = {
  [key in T]: NSchemaService.Store;
};
