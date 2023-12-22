import { ContainerModule } from '@Server/Package';
import { ServerSymbols } from '@Server/Symbols';
import { Initiator } from '../initiator';
import { DiscoveryService, LoggerService, NextService } from '../services';

import type { IDiscoveryService, IInitiator, ILoggerService, INextService } from '@Server/Types';

export const ServerModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(ServerSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(ServerSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<INextService>(ServerSymbols.NextService).to(NextService).inSingletonScope();

  // Initiator
  bind<IInitiator>(ServerSymbols.Initiator).to(Initiator).inTransientScope();
});
