export const ServerSymbols = {
  // Services
  DiscoveryService: Symbol('DiscoveryService'),
  LoggerService: Symbol('LoggerService'),
  NextService: Symbol('NextService'),
  SchemaService: Symbol('SchemaService'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
