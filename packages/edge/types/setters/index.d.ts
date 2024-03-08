import React, { ReactElement } from 'react';
import type { NSchemaService } from '../services';
import { AnyObject } from '../utility';
import Agents = NSchemaService.Agents;
import { ServiceDocStructure } from '../vendor';

export type Documents = {
  router?: NSchemaService.Router<string>;
  emitter?: NSchemaService.Emitter<string>;
  validator?: ValidatorStructure;
  store?: StoreStructure;
  dictionaries?: DictionaryStructure | DictionaryStructure[];
  views?: ViewStructure | ViewStructure[];
};

export type EntryPointStructure<D extends string = string> = {
  domain: D;
  documents: Documents;
  documentation?: DomainDocStructure<string> | DomainDocStructure<string>[] | null;
};

export type StoreStructure<T extends string = string, B = any, A = any> = {
  [key in T]?: NSchemaService.Store<B, A>;
};

export type ValidatorStructure<T extends string = string> = {
  [key in T]?: NSchemaService.Validator;
};

export type DictionaryStructure<
  L extends string = string,
  D extends NSchemaService.Dictionary = NSchemaService.Dictionary,
> = {
  language: L;
  dictionary: D;
};

export type ViewStructure<N extends string = string, P extends AnyObject = AnyObject> = {
  name: N;
  View: (agents: Agents, props?: P) => ReactElement<P>;
};

export type DomainDocStructure<
  LANGUAGE extends string,
  RELEASE extends string | string[] = string | string[],
> = {
  language: LANGUAGE;
  description: DomainDescription<RELEASE>;
};

export type DomainDescription<RELEASE extends string | string[] = string | string[]> = {};

export type ServiceStructure = {
  service: string;
  domains: EntryPointStructure[];
  documentation?: ServiceDocStructure<string> | ServiceDocStructure<string>[] | null;
};
