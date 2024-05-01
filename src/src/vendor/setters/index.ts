import { ReactElement } from 'react';
import {
  AnyObject,
  Documents,
  DomainDocStructure,
  EntryPointStructure,
  ExtendedRecordObject,
  NSchemaAgent,
  NSchemaService,
  ServiceStructure,
  StoreStructure,
  ViewStructure,
} from '~types';

export const setEntryPoint = <D extends string = string>(
  domain: D,
  documents: Documents,
  documentation?: DomainDocStructure<string> | DomainDocStructure<string>[] | null
): EntryPointStructure<D> => {
  return { domain, documents, documentation };
};

export const setDictionary = <L extends string, D extends ExtendedRecordObject>(
  language: L,
  dictionary: D
): NSchemaService.DictionaryStructure<L, D> => {
  return { language, dictionary };
};

export const setEmitter = <
  T extends string | Record<string, NSchemaService.WsListener> | NSchemaService.EmitterAdvanced =
    | string
    | Record<string, NSchemaService.WsListener>
    | NSchemaService.EmitterAdvanced,
>(
  structure: NSchemaService.Emitter<T>
): NSchemaService.Emitter<T> => {
  return structure;
};

export const setRouter = <
  T extends string | Record<string, NSchemaService.Controller> | NSchemaService.RouterAdvanced =
    | string
    | Record<string, NSchemaService.Controller>
    | NSchemaService.RouterAdvanced,
>(
  structure: NSchemaService.Router<T>
): NSchemaService.Router<T> => {
  return structure;
};

export const setStore = <B = AnyObject, A = AnyObject>(
  structure: StoreStructure<B, A>
): StoreStructure<B, A> => {
  return structure;
};

export const setView = <N extends string = string, P = any>(
  name: N,
  view: (
    agents: NSchemaService.Agents,
    context: NSchemaAgent.ViewContext,
    props: P
  ) => ReactElement<P>
): ViewStructure<N, P> => {
  return { name, view };
};

export const setService = <S extends string = string>(
  service: S,
  domains: EntryPointStructure[]
): ServiceStructure => {
  return { service, domains };
};
