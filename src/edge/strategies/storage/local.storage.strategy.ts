import { injectable } from '@Edge/Package';
import { AbstractStorageStrategy } from './abstract.storage.strategy';

@injectable()
export class LocalStorageStrategy extends AbstractStorageStrategy {
  protected readonly storage = localStorage;
}
