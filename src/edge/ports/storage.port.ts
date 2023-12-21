import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import type { IStorageFactory, IStoragePort, IStorageStrategy } from '@Edge/Types';

@injectable()
export class StoragePort implements IStoragePort {
  constructor(
    @inject(EdgeSymbols.StorageFactory)
    private readonly _storageFactory: IStorageFactory
  ) {}

  public get localStorage(): IStorageStrategy {
    return this._storageFactory.getStorage('local');
  }
  public get sessionStorage(): IStorageStrategy {
    return this._storageFactory.getStorage('session');
  }
}
