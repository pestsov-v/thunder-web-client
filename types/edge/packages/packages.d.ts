import axios from 'axios';
import { StateCreator as ZStateCreator } from 'zustand';
import {
  Mutate as ZMutate,
  StoreApi as ZStoreApi,
  StoreMutatorIdentifier as ZStoreMutatorIdentifier,
} from 'zustand/esm/vanilla';

export namespace Axios {
  export type AxiosRequestConfig<DATA = any> = axios.AxiosRequestConfig<DATA>;
  export type AxiosInstance = axios.AxiosInstance;
  export type AxiosError = axios.AxiosError;
  export type AxiosResponse<T> = axios.AxiosResponse<T>;
}

export namespace Zustand {
  type Get<T, K, F> = K extends keyof T ? T[K] : F;

  export type Mutate<T, Ms> = ZMutate<T, Ms>;
  export type StoreApi<T> = ZStoreApi<T>;
  export type StoreMutatorIdentifier = ZStoreMutatorIdentifier | ['zustand/persist', unknown][];
  export type Actions = <
    T,
    Mis extends [StoreMutatorIdentifier | string, unknown][] = [],
    Mos extends [StoreMutatorIdentifier | string, unknown][] = [],
    U = T,
  >(
    setState: Get<Mutate<StoreApi<T>, Mis>, 'setState', never>,
    getState: Get<Mutate<StoreApi<T>, Mis>, 'getState', never>,
    store: Mutate<StoreApi<T>, Mis>
  ) => U & {
    $$storeMutators?: Mos;
  };

  export type StateCreator<
    T,
    Mis extends [StoreMutatorIdentifier, unknown][] = [],
    Mos extends [StoreMutatorIdentifier, unknown][] = [],
  > = ZStateCreator<T, Mis, Mos, T>;

  export type PersistStateCreator<
    T,
    Mps extends [StoreMutatorIdentifier, unknown][] = [],
    Mcs extends [StoreMutatorIdentifier, unknown][] = [],
  > = StateCreator<T, Mps, [['zustand/persist', T], ...Mcs], T>;
}
