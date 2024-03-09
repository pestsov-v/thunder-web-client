import {
  AnyObject,
  Documents,
  DomainDocStructure,
  EntryPointStructure,
  ExtendedRecordObject,
  NSchemaService,
  ServiceStructure,
  StoreStructure,
  ViewStructure,
} from '@Edge/Types';
import { ServiceDocStructure } from '../../../types/vendor';

export const setEntryPoint = <D extends string = string>(
  domain: D,
  documents: Documents,
  documentation?: DomainDocStructure<string> | DomainDocStructure<string>[] | null
): EntryPointStructure<D> => {
  return { domain, documents, documentation };
};

export const setDictionary = <L extends string, D extends ExtendedRecordObject>(
  structure: NSchemaService.DictionaryStructure<L, D>
): NSchemaService.DictionaryStructure<L, D> => {
  return structure;
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

export const setView = <
  T extends string = string,
  P extends AnyObject | { className?: string } = { className?: string },
>(
  structure: ViewStructure<T, P>
) => {
  return structure;
};

export const setService = <S extends string = string>(
  service: S,
  domains: EntryPointStructure[],

  documentation?: ServiceDocStructure<string> | ServiceDocStructure<string>[] | null
): ServiceStructure => {
  return { service, domains, documentation };
};
