export const EdgeSymbols = {
  // Services
  GetawayService: Symbol('GetawayService'),
  SessionService: Symbol('SessionService'),
  SchemaService: Symbol('SchemaService'),
  LocalizationService: Symbol('LocalizationService'),

  // Loaders
  SchemaLoader: Symbol('SchemaLoader'),

  // Agents
  FunctionalityAgent: Symbol('FunctionalityAgent'),

  // Initiator
  Initiator: Symbol('Initiator'),
} as const;
