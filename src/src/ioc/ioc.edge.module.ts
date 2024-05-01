import { ContainerModule } from '~package';
import { CoreSymbols } from '~symbols';

import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { FunctionalityAgent, SchemaAgent } from '../agents';
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
} from '~types';
import { HttpAdapter, WsAdapter } from '../adapters';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<IGetawayService>(CoreSymbols.GetawayService).to(GetawayService).inSingletonScope();
  bind<ISessionService>(CoreSymbols.SessionService).to(SessionService).inSingletonScope();
  bind<IStoreService>(CoreSymbols.StoreService).to(StoreService).inSingletonScope();
  bind<ISchemaService>(CoreSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<ILocalizationService>(CoreSymbols.LocalizationService)
    .to(LocalizationService)
    .inSingletonScope();
  bind<IAuthService>(CoreSymbols.AuthService).to(AuthService).inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Adapters
  bind<IHttpAdapter>(CoreSymbols.HttpAdapter).to(HttpAdapter).inSingletonScope();
  bind<IWsAdapter>(CoreSymbols.WsAdapter).to(WsAdapter).inSingletonScope();

  // Strategies
  bind<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
    .to(LocalStorageStrategy)
    .inTransientScope();
  bind<IStorageStrategy>(CoreSymbols.SessionStorageStrategy)
    .to(SessionStorageStrategy)
    .inTransientScope();

  // Factories
  bind<IStorageFactory>(CoreSymbols.StorageFactory).to(StorageFactory).inSingletonScope();

  // Providers
  bind<IStorageProvider>(CoreSymbols.StorageProvider).to(StorageProvider).inTransientScope();
  bind<INavigatorProvider>(CoreSymbols.NavigatorProvider).to(NavigatorProvider).inTransientScope();

  // Agents
  bind<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();
  bind<ISchemaAgent>(CoreSymbols.SchemaAgent).to(SchemaAgent).inTransientScope();

  // Initiator
  bind<IInitiator>(CoreSymbols.Initiator).to(Initiator).inSingletonScope();
});
