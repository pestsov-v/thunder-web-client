import { container } from '@Edge/Container';
import { IInitiator } from '@Edge/Types';
import { EdgeSymbols } from '@Edge/Symbols';

export * from './vendor';
const webClientInitiator = container.get<IInitiator>(EdgeSymbols.Initiator);
export { webClientInitiator };
