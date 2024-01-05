import type { NSchemaService } from '../services';
import type { FC } from 'react';
import type { EnvironmentKind, HttpMethod, AnyObject } from '../../common';

export type CollectionStructure = {
  domain: string;
  documents: {
    router?: RouterStructure<string>;
    controller?: ControllerStructure;
    wsListeners?: WsListenerStructure;
    validator?: ValidatorStructure;
    store?: StoreStructure;
    dictionaries?: DictionaryStructure | DictionaryStructure[];
    views?: ViewStructure | ViewStructure[];
  };
};

export type StoreStructure<T extends string = string, B = any, A = any> = {
  [key in T]?: NSchemaService.Store<B, A>;
};

export type ValidatorStructure<T extends string = string> = {
  [key in T]?: NSchemaService.Validator;
};

export type RouterStructure<T extends string, D extends string = string> = {
  [key in T]: {
    [key in HttpMethod]?: {
      environment: EnvironmentKind;
      service: string;
      domain: D;
      isPrivateUser?: boolean;
      isPrivateOrganization?: boolean;
    };
  };
};

export type DictionaryStructure<
  L extends string = string,
  D extends NSchemaService.Dictionary = NSchemaService.Dictionary,
> = {
  language: L;
  dictionary: D;
};

export type ViewStructure<N extends string = string, P = AnyObject> = {
  name: N;
  View: FC<P>;
};

export type ControllerStructure<T extends string = string> = {
  [key in T]: NSchemaService.ControllerHandler;
};

export type WsListenerStructure<T extends string = string> = {
  [key in T]: NSchemaService.WsListener;
};
