import { injectable } from '@Edge/Package';
import { AbstractService } from './abstract.service';
import { IDiscoveryService } from '@Edge/Types';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;

  protected init(): boolean {
    return true;
  }

  protected destroy(): void {}

  public setVariables(): void {}
}
