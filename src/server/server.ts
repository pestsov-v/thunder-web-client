import { express, next } from '@Server/Package';

const isDev = process.env.NODE_ENV !== 'production';

const server = next({ dev: isDev });
const nextHandler = server.getRequestHandler();
const app = express();

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
