import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { FunctionalityAgent } from '../agents';
import { SentryIntegration } from '../integrations';
import { NavigatorProvider, StorageProvider } from '../providers';
import { StorageFactory } from '../factories';
import { LocalStorageStrategy, SessionStorageStrategy } from '../strategies/storage';
import {
  DiscoveryService,
  GetawayService,
  LocalizationService,
  SchemaService,
  SessionService,
  StoreService,
} from '../services';

import type {
  IDiscoveryService,
  IFunctionalityAgent,
  IGetawayService,
  IInitiator,
  ILocalizationService,
  INavigatorProvider,
  ISchemaLoader,
  ISchemaService,
  ISessionService,
  IStorageFactory,
  IStorageProvider,
  IStorageStrategy,
  IStoreService,
} from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(EdgeSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IGetawayService>(EdgeSymbols.GetawayService).to(GetawayService).inSingletonScope();
  bind<ISessionService>(EdgeSymbols.SessionService).to(SessionService).inSingletonScope();
  bind<IStoreService>(EdgeSymbols.StoreService).to(StoreService).inSingletonScope();
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

  // Providers
  bind<IStorageProvider>(EdgeSymbols.StorageProvider).to(StorageProvider).inTransientScope();
  bind<INavigatorProvider>(EdgeSymbols.NavigatorProvider).to(NavigatorProvider).inTransientScope();

  // Integrations
  bind(EdgeSymbols.SentryIntegration).to(SentryIntegration).inSingletonScope();

  // Agents
  bind<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();

  // Initiator
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
