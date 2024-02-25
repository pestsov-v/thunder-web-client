import { container } from '@Edge/Container';
import { EdgeSymbols } from '@Edge/Symbols';
import { UseBoundStore } from 'zustand/esm/react';

import { Zustand, IStoreService } from '@Edge/Types';

export const getStore = <
  D extends string = string,
  S extends string = string,
  T = any,
  A extends Zustand.StoreApi<T> = Zustand.StoreApi<T>,
>(
  service: S,
  domain: D,
  store: S
): UseBoundStore<A> => {
  return container.get<IStoreService>(EdgeSymbols.StoreService).createStore(service, domain, store);
};
