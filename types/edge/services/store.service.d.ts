import { IAbstractService } from '@Edge/Types';
import { Zustand } from '@Edge/Package/Types';

export interface IStoreService extends IAbstractService {
  createStore<T>(
    domain: string,
    store: string
  ): Zustand.StateCreator<T> | Zustand.PersistStateCreator<T>;
}

export namespace NStoreService {}
