import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { FunctionalityAgent } from '../agents';
import { StoragePort } from '../ports';
import { StorageFactory } from '../factories';
import { LocalStorageStrategy, SessionStorageStrategy } from '../strategies/storage';
import {
  DiscoveryService,
  GetawayService,
  LocalizationService,
  SchemaService,
  SessionService,
} from '../services';

import type {
  IDiscoveryService,
  IFunctionalityAgent,
  IGetawayService,
  IInitiator,
  ILocalizationService,
  ISchemaLoader,
  ISchemaService,
  ISessionService,
  IStorageFactory,
  IStoragePort,
  IStorageStrategy,
} from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(EdgeSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IGetawayService>(EdgeSymbols.GetawayService).to(GetawayService).inSingletonScope();
  bind<ISessionService>(EdgeSymbols.SessionService).to(SessionService).inSingletonScope();
  bind<ISchemaService>(EdgeSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<ILocalizationService>(EdgeSymbols.LocalizationService)
    .to(LocalizationService)
    .inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(EdgeSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Strategies
  bind<IStorageStrategy>(EdgeSymbols.LocalStorageStrategy)
    .to(LocalStorageStrategy)
    .inTransientScope();
  bind<IStorageStrategy>(EdgeSymbols.SessionStorageStrategy)
    .to(SessionStorageStrategy)
    .inTransientScope();

  // Factories
  bind<IStorageFactory>(EdgeSymbols.StorageFactory).to(StorageFactory).inSingletonScope();

  // Ports
  bind<IStoragePort>(EdgeSymbols.StoragePort).to(StoragePort).inSingletonScope();

  // Agents
  bind<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();

  // Initiator
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
