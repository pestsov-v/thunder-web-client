import { IStorageStrategy } from '@Edge/Types';

export interface IStorageProvider {
  readonly localStorage: IStorageStrategy;
  readonly sessionStorage: IStorageStrategy;
}
