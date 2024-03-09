import { ContainerModule } from '../packages/packages';
import { EdgeSymbols } from '@Edge/Symbols';

import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { FunctionalityAgent, SchemaAgent } from '../agents';
import { SentryIntegration } from '../integrations';
import { NavigatorProvider, StorageProvider } from '../providers';
import { StorageFactory } from '../factories';
import { LocalStorageStrategy, SessionStorageStrategy } from '../strategies/storage';
import {
  AuthService,
  DiscoveryService,
  GetawayService,
  LocalizationService,
  SchemaService,
  SessionService,
  StoreService,
} from '../services';

import type {
  IAuthService,
  IDiscoveryService,
  IFunctionalityAgent,
  IGetawayService,
  IHttpAdapter,
  IInitiator,
  ILocalizationService,
  INavigatorProvider,
  ISchemaAgent,
  ISchemaLoader,
  ISchemaService,
  ISessionService,
  IStorageFactory,
  IStorageProvider,
  IStorageStrategy,
  IStoreService,
  IWsAdapter,
} from '@Edge/Types';
import { HttpAdapter, WsAdapter } from '../adapters';

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
  bind<IAuthService>(EdgeSymbols.AuthService).to(AuthService).inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(EdgeSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Adapters
  bind<IHttpAdapter>(EdgeSymbols.HttpAdapter).to(HttpAdapter).inSingletonScope();
  bind<IWsAdapter>(EdgeSymbols.WsAdapter).to(WsAdapter).inSingletonScope();

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
  bind<ISchemaAgent>(EdgeSymbols.SchemaAgent).to(SchemaAgent).inTransientScope();

  // Initiator
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
