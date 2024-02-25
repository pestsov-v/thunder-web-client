import { IAbstractService } from './abstract.service';
import { Zustand } from '../packages/packages';

export interface IStoreService extends IAbstractService {
  createStore<T>(
    service: string,
    domain: string,
    store: string
  ): Zustand.StateCreator<T> | Zustand.PersistStateCreator<T>;
}

export namespace NStoreService {}
