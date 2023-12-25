import { container } from '@EdgeContainer';
import { IStoreService } from '@Edge/Types';
import { EdgeSymbols } from '@EdgeSymbols';
import { Zustand } from '@Edge/Package/Types';
import { UseBoundStore } from 'zustand/esm/react';

export const getStore = <
  D extends string = string,
  S extends string = string,
  T = any,
  A extends Zustand.StoreApi<T> = Zustand.StoreApi<T>,
>(
  domain: D,
  store: S
): UseBoundStore<A> => {
  return container.get<IStoreService>(EdgeSymbols.StoreService).createStore(domain, store);
};
