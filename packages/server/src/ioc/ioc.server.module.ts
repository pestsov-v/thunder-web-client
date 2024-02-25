import { ContainerModule } from '../packages/packages';
import { ServerSymbols } from './ioc.server.symbols';
import { Initiator } from '../initiator';
import { DiscoveryService, LoggerService, NextService, SchemaService } from '../services';

import type {
  IDiscoveryService,
  IInitiator,
  ILoggerService,
  INextService,
  ISchemaService,
} from '../../types';

export const ServerModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(ServerSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ILoggerService>(ServerSymbols.LoggerService).to(LoggerService).inSingletonScope();
  bind<INextService>(ServerSymbols.NextService).to(NextService).inSingletonScope();
  bind<ISchemaService>(ServerSymbols.SchemaService).to(SchemaService).inSingletonScope();

  // Initiator
  bind<IInitiator>(ServerSymbols.Initiator).to(Initiator).inTransientScope();
});
