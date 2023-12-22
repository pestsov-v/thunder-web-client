import axios from 'axios';
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
  export type Mutate<T, Ms> = ZMutate<T, Ms>;
  export type StoreApi<T> = ZStoreApi<T>;
  export type StoreMutatorIdentifier = ZStoreMutatorIdentifier;
}
