import { ContainerModule } from '@Server/Package';
import { ServerSymbols } from '@Server/Symbols';
import { Initiator } from '../initiator';
import { DiscoveryService } from '../services';

import type { IDiscoveryService, IInitiator } from '@Server/Types';

export const ServerModule = new ContainerModule((bind) => {
  // Services
  bind<IDiscoveryService>(ServerSymbols.DiscoveryService).to(DiscoveryService).inSingletonScope();

  // Initiator
  bind<IInitiator>(ServerSymbols.Initiator).to(Initiator).inTransientScope();
});
