import { ContainerModule } from '@Server/Package';
import { ServerSymbols } from '@Server/Symbols';
import { Initiator } from '../initiator';
import { DiscoveryService, LoggerService, NextService, SchemaService } from '../services';

import type {
  IDiscoveryService,
  IInitiator,
  ILoggerService,
  INextService,
  ISchemaService,
} from '@Server/Types';

export const ServerModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(ServerSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(ServerSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<INextService>(ServerSymbols.NextService).to(NextService).inSingletonScope();
  bind<ISchemaService>(ServerSymbols.SchemaService).to(SchemaService).inSingletonScope();

  // Initiator
  bind<IInitiator>(ServerSymbols.Initiator).to(Initiator).inTransientScope();
});
