export const CoreSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  GetawayService: Symbol('GetawayService'),
  SessionService: Symbol('SessionService'),
  SchemaService: Symbol('SchemaService'),
  LocalizationService: Symbol('LocalizationService'),
  StoreService: Symbol('StoreService'),
  AuthService: Symbol('AuthService'),

  // Adapters
  HttpAdapter: Symbol('HttpAdapter'),
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

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),
  SchemaAgent: Symbol('SchemaAgent'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
