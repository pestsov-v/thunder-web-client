import { container } from './ioc/ioc.server';
import { IInitiator } from '../types';
import { ServerSymbols } from './ioc/ioc.server.symbols';

const serverInitiator = container.get<IInitiator>(ServerSymbols.Initiator);
export { serverInitiator };
