import { container } from '~container';
import { CoreSymbols } from '~symbols';
import { IInitiator, ServiceStructure } from '~types';

import { SCHEMA_SERVICES } from './common';

export * from './vendor';
const initiator = container.get<IInitiator>(CoreSymbols.Initiator);

const setServices = (services: ServiceStructure[]): void => {
  SCHEMA_SERVICES.length = 0;
  SCHEMA_SERVICES.push(...services);
};

export { initiator, setServices };
