import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { Initiator } from '../initiator';
import { SchemaLoader } from '../loaders';
import { FunctionalityAgent } from '../agents';
import { GetawayService, LocalizationService, SchemaService, SessionService } from '../services';

import type {
  IFunctionalityAgent,
  IGetawayService,
  IInitiator,
  ILocalizationService,
  ISchemaLoader,
  ISchemaService,
  ISessionService,
} from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  // Services
  bind<IGetawayService>(EdgeSymbols.GetawayService).to(GetawayService).inSingletonScope();
  bind<ISessionService>(EdgeSymbols.SessionService).to(SessionService).inSingletonScope();
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
