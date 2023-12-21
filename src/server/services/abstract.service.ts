import { injectable } from '@Server/Package';

import type { IAbstractService, IDiscoveryService } from '@Server/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract readonly _SERVICE_NAME: string;
  protected abstract init(): Promise<boolean>;
  protected abstract destroy(): Promise<void>;
  protected abstract readonly _discoveryService: IDiscoveryService;

  public async start(): Promise<void> {
    try {
      if (await this.init()) {
        console.log(`Service ${this._SERVICE_NAME} has been started.`);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async stop(): Promise<void> {
    try {
      await this.destroy();
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
