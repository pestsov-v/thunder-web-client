import { container } from './ioc/ioc.server';
import { ServerSymbols } from '@Server/Symbols';
import { IInitiator } from '../types';

const serverInitiator = container.get<IInitiator>(ServerSymbols.Initiator);
export { serverInitiator };
