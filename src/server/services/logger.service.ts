import { injectable, inject } from '@Server/Package';
import { AbstractService } from './abstract.service';
import { ServerSymbols } from '@Server/Symbols';

import type { IDiscoveryService, ILoggerService } from '@Server/Types';

@injectable()
export class LoggerService extends AbstractService implements ILoggerService {
  protected readonly _SERVICE_NAME = LoggerService.name;
  protected readonly _loggerService = this;

  constructor(
    @inject(ServerSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService
  ) {
    super();
  }

  protected async init(): Promise<boolean> {
    return false;
  }

  protected async destroy(): Promise<void> {
    return;
  }

  public error(): void {
    console.log('error');
  }
}
