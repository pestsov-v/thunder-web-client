import React, { ReactElement } from 'react';
import type { NSchemaService } from '../services';
import { AnyObject } from '../utility';
import Agents = NSchemaService.Agents;
import { ServiceDocStructure } from '../vendor';
import { NSchemaAgent } from '../agents';

export type Documents = {
  router?: NSchemaService.Router<string>;
  emitter?: NSchemaService.Emitter<string>;
  validator?: ValidatorStructure;
  store?: StoreStructure;
  dictionaries?: DictionaryStructure | DictionaryStructure[];
  views?: ViewStructure | ViewStructure[];
};

export type Configuration = {
  auth?: {
    user?: {
      updateAccessToken?: NSchemaService.Controller;
      expiredRefreshToken?: NSchemaService.Controller;
    };
    org?: {
      updateAccessToken?: NSchemaService.Controller;
      expiredRefreshToken?: NSchemaService.Controller;
    };
  };
};

export type EntryPointStructure<D extends string = string> = {
  domain: D;
  documents: Documents;
  documentation?: DomainDocStructure<string> | DomainDocStructure<string>[] | null;
};

export type StoreStructure<B = any, A = any> = NSchemaService.Store<B, A>;

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
  view: (agents: Agents, context: NSchemaAgent.ViewContext, props?: P) => ReactElement<P>;
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
  config?: Configuration;
  documentation?: ServiceDocStructure<string> | ServiceDocStructure<string>[] | null;
};
