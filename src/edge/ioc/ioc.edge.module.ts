import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { SchemaService } from '../services';

import type { IInitiator, ISchemaLoader, ISchemaService } from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind<ISchemaService>(EdgeSymbols.SchemaService).to(SchemaService).inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(EdgeSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Initiator
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
