import { injectable } from '@Server/Package';
import { AbstractService } from './abstract.service';

import type { IDiscoveryService } from '@Server/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;
  protected readonly _discoveryService = this;

  protected async init(): Promise<boolean> {
    return true;
  }

  public getString(name: string, def: string): string {
    return '';
  }

  protected async destroy(): Promise<void> {}
}
