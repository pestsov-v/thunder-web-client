import { injectable, inject } from '@Server/Package';
import { ServerSymbols } from '@Server/Symbols';

import type {
  IDiscoveryService,
  IInitiator,
  ILoggerService,
  INextService,
  ISchemaService,
} from '../types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(ServerSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(ServerSymbols.LoggerService)
    private readonly _loggerService: ILoggerService,
    @inject(ServerSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(ServerSymbols.NextService)
    private readonly _nextService: INextService
  ) {}

  public async start(): Promise<void> {
    await this._discoveryService.start();
    await this._loggerService.start();
    await this._schemaService.start();
    await this._nextService.start();
  }

  public async stop(): Promise<void> {
    await this._nextService.stop();
    await this._schemaService.stop();
    await this._loggerService.stop();
    await this._discoveryService.stop();
  }
}