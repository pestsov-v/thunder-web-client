import { ContainerModule } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { Initiator } from '../initiator';

import type { IInitiator } from '@Edge/Types';

export const EdgeModule = new ContainerModule((bind) => {
  bind<IInitiator>(EdgeSymbols.Initiator).to(Initiator).inSingletonScope();
});
