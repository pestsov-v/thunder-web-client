import { express, next } from '@Server/Package';
import { container } from '@Server/Container';
import { IInitiator } from '@Server/Types';
import { ServerSymbols } from '@Server/Symbols';

const isDev = process.env.NODE_ENV !== 'production';

const initiator = container.get<IInitiator>(ServerSymbols.Initiator);

initiator.start().catch((e) => console.log(e));

const server = next({ dev: isDev, customServer: true });
const nextHandler = server.getRequestHandler();
const app = express();

if (!process.env.NODE_ENV) {
  throw new Error('Node environment mode is undefined');
}

server
  .prepare()
  .then(() => {
    app.get('*', (req: express.Request, res: express.Response) => {
      return nextHandler(req, res);
    });

    app.listen(3012, () => {
      console.log('server ready on port 3012');
    });
  })
  .catch((exception) => {
    console.error(exception.stack);
    process.exit(1);
  });
