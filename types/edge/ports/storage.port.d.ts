import { IStorageStrategy } from '@Edge/Types';

export interface IStoragePort {
  readonly localStorage: IStorageStrategy;
  readonly sessionStorage: IStorageStrategy;
}
