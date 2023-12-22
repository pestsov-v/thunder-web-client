import { container } from '@Server/Container';
import { IInitiator } from '@Server/Types';
import { ServerSymbols } from '@Server/Symbols';

const initiator = container.get<IInitiator>(ServerSymbols.Initiator);

initiator.start().catch((e) => console.log(e));
