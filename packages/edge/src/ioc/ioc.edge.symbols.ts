export const EdgeSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  GetawayService: Symbol('GetawayService'),
  SessionService: Symbol('SessionService'),
  SchemaService: Symbol('SchemaService'),
  LocalizationService: Symbol('LocalizationService'),
  StoreService: Symbol('StoreService'),

  // Adapters
  WsAdapter: Symbol('WsAdapter'),

  // Loaders
  SchemaLoader: Symbol('SchemaLoader'),

  // Strategies
  LocalStorageStrategy: Symbol('LocalStorageStrategy'),
  SessionStorageStrategy: Symbol('SessionStorageStrategy'),

  // Factories
  StorageFactory: Symbol('StorageFactory'),

  // Providers
  StorageProvider: Symbol('StorageProvider'),
  NavigatorProvider: Symbol('NavigatorProvider'),

  // Integrations
  SentryIntegration: Symbol('SentryIntegration'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
