export const CoreSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  CombinationService: Symbol('CombinationService'),
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
  StorybookLoader: Symbol('StorybookLoader'),

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
  StorybookAgent: Symbol('StorybookAgent'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
