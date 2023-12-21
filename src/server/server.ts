import { express, next } from '@Server/Package';

const isDev = process.env.NODE_ENV !== 'production';

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

import config from 'config';
import * as os from 'os';

if (!process.env.NODE_ENV) {
  throw new Error('Node environment mode is undefined');
}

const initiator = async () => {
  const schemaProfile = process.env.THUNDER_SCHEMA_PROFILE || 'default';

  const baseConfig = config.util.loadFileConfigs(
    `${os.homedir()}/.cap_configs/schemas/${schemaProfile}/web-client/`
  );
  config.util.setModuleDefaults('config', baseConfig);

  process.env.THE = JSON.stringify(baseConfig);
};

initiator().catch((e) => console.log(e));

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
