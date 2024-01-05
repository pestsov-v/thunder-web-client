import { injectable } from '@Edge/Package';
import { AbstractStorageStrategy } from './abstract.storage.strategy';

import type { IStorageStrategy } from '@Edge/Types';

@injectable()
export class SessionStorageStrategy extends AbstractStorageStrategy implements IStorageStrategy {
  protected readonly storage = sessionStorage;
  constructor() {
    super();
  }
}
