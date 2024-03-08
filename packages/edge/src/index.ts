import { container } from '@Edge/Container';
import { IInitiator, ServiceStructure } from '@Edge/Types';
import { EdgeSymbols } from '@Edge/Symbols';

import { SCHEMA_SERVICES } from './common';

export * from './vendor';
const webClientInitiator = container.get<IInitiator>(EdgeSymbols.Initiator);

const setServices = (services: ServiceStructure[]): void => {
  SCHEMA_SERVICES.length = 0;
  SCHEMA_SERVICES.push(...services);
};

export { webClientInitiator, setServices };
