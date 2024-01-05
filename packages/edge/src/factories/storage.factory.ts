import { injectable } from '@Edge/Package';
import { container } from '@Edge/Container';
import { EdgeSymbols } from '@Edge/Symbols';
import { Helpers } from '../utils';

import type { IStorageFactory, NStorageFactory, IStorageStrategy } from '@Edge/Types';

@injectable()
export class StorageFactory implements IStorageFactory {
  public getStorage(kind: NStorageFactory.StorageKind): IStorageStrategy {
    switch (kind) {
      case 'session':
        return container.get<IStorageStrategy>(EdgeSymbols.SessionStorageStrategy);
      case 'local':
        return container.get<IStorageStrategy>(EdgeSymbols.LocalStorageStrategy);
      default:
        throw Helpers.switchCaseChecker(kind);
    }
  }
}
