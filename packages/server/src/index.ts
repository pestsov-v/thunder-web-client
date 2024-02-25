import { container } from './ioc/ioc.server';
import { ServerSymbols } from './ioc/ioc.server.symbols';
import { IInitiator } from '../types';

const serverInitiator = container.get<IInitiator>(ServerSymbols.Initiator);
export { serverInitiator };
