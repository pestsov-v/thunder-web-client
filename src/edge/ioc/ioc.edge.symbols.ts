export const EdgeSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  GetawayService: Symbol('GetawayService'),
  SessionService: Symbol('SessionService'),
  SchemaService: Symbol('SchemaService'),
  LocalizationService: Symbol('LocalizationService'),
  StoreService: Symbol('StoreService'),

  // Loaders
  SchemaLoader: Symbol('SchemaLoader'),

  // Strategies
  LocalStorageStrategy: Symbol('LocalStorageStrategy'),
  SessionStorageStrategy: Symbol('SessionStorageStrategy'),

  // Factories
  StorageFactory: Symbol('StorageFactory'),

  // Ports
  StoragePort: Symbol('StoragePort'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
