import { inversify } from '~packages';
import { CoreSymbols } from '~symbols';

import { Initiator } from '../initiator';

import {
  HttpAdapter,
  WsAdapter,
  StorageFactory,
  StorageProvider,
  NavigatorProvider,
  DiscoveryService,
  SchemaService,
  CombinationService,
  LocalizationService,
  SessionService,
  StoreService,
  AuthService,
  LocalStorageStrategy,
  SessionStorageStrategy,
} from '../fn-components';
import {
  SchemaLoader,
  StorybookLoader,
  FunctionalityAgent,
  SchemaAgent,
} from '../ba-communication';

import type {
  IHttpAdapter,
  IWsAdapter,
  IAuthService,
  IDiscoveryService,
  IFunctionalityAgent,
  ICombinationService,
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
  IStorybookLoader,
} from '~types';

export const EdgeModule = new inversify.ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(CoreSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();
  bind<ICombinationService>(CoreSymbols.CombinationService)
    .to(CombinationService)
    .inSingletonScope();
  bind<ISessionService>(CoreSymbols.SessionService).to(SessionService).inSingletonScope();
  bind<IStoreService>(CoreSymbols.StoreService).to(StoreService).inSingletonScope();
  bind<ISchemaService>(CoreSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<ILocalizationService>(CoreSymbols.LocalizationService)
    .to(LocalizationService)
    .inSingletonScope();
  bind<IAuthService>(CoreSymbols.AuthService).to(AuthService).inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(CoreSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();
  bind<IStorybookLoader>(CoreSymbols.StorybookLoader).to(StorybookLoader).inSingletonScope();

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
