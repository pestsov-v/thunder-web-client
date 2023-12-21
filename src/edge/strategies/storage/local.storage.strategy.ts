import { injectable } from '@Edge/Package';
import { AbstractStorageStrategy } from './abstract.storage.strategy';

import type { IStorageStrategy } from '@Edge/Types';

@injectable()
export class LocalStorageStrategy extends AbstractStorageStrategy implements IStorageStrategy {
  protected readonly storage = localStorage;

  constructor() {
    super();
  }
}
