import { injectable, inject } from '@Server/Package';
import { ServerSymbols } from '@Server/Symbols';

import type { IDiscoveryService, IInitiator } from '@Server/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(ServerSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService
  ) {}

  public async start(): Promise<void> {
    await this._discoveryService.start();
  }

  public async stop(): Promise<void> {
    await this._discoveryService.stop();
  }
}
