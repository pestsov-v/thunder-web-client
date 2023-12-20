import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { FunctionalityAgent } from '../agents';
import { GetawayService, LocalizationService, SchemaService } from '../services';

import type {
  IFunctionalityAgent,
  IInitiator,
  ILocalizationService,
  ISchemaLoader,
  ISchemaService,
} from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind(EdgeSymbols.GetawayService).to(GetawayService).inSingletonScope();
  bind<ISchemaService>(EdgeSymbols.SchemaService).to(SchemaService).inSingletonScope();
  bind<ILocalizationService>(EdgeSymbols.LocalizationService)
    .to(LocalizationService)
    .inSingletonScope();

  // Loaders
  bind<ISchemaLoader>(EdgeSymbols.SchemaLoader).to(SchemaLoader).inSingletonScope();

  // Agents
  bind<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent)
    .to(FunctionalityAgent)
    .inTransientScope();

  // Initiator
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
