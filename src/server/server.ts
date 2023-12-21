import { express, next } from '@Server/Package';
import { container } from '@Server/Container';
import { IInitiator } from '@Server/Types';
import { ServerSymbols } from '@Server/Symbols';
import * as os from 'os';
import config from 'config';

const isDev = process.env.NODE_ENV !== 'production';

const initiator = container.get<IInitiator>(ServerSymbols.Initiator);

initiator.start().catch((e) => console.log(e));

const server = next({
  dev: isDev,
  customServer: true,
  conf: {
    env: {
      customJey:
        '3eqwewqewewqewqewqewqewqxsdadad3eqwewqewewqewqewqewqewqxsdadad3eqwewqewewqewqewqewqewqxsdadad3eqwewqewewqewqewqewqewqxsdadad',
    },
  },
});
const nextHandler = server.getRequestHandler();
const app = express();

if (!process.env.NODE_ENV) {
  throw new Error('Node environment mode is undefined');
}

const initiatorhandler = async () => {
  const schemaProfile = process.env.THUNDER_SCHEMA_PROFILE || 'default';

  const baseConfig = config.util.loadFileConfigs(
    `${os.homedir()}/.cap_configs/schemas/${schemaProfile}/web-client/`
  );
  config.util.setModuleDefaults('config', baseConfig);

  process.env.THE = JSON.stringify(baseConfig);
};

initiatorhandler().catch((e) => console.log(e));

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
