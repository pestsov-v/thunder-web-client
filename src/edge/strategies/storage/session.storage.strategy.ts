import { injectable } from '@Edge/Package';
import { AbstractStorageStrategy } from './abstract.storage.strategy';

@injectable()
export class SessionStorageStrategy extends AbstractStorageStrategy {
  protected readonly storage = sessionStorage;
}
