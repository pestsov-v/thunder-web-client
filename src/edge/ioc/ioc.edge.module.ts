import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { Initiator } from '../initiator';
import { SchemaService } from '../services';

import type { IInitiator, ISchemaService } from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind<ISchemaService>(EdgeSymbols.SchemaService).to(SchemaService).inSingletonScope();

  // Initiator
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
