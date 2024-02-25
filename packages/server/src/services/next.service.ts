import { injectable, inject, next, express } from '../packages/packages';
import { ServerSymbols } from '@Server/Symbols';
import { AbstractService } from './abstract.service';

import type {
  Next,
  Express,
  IDiscoveryService,
  ILoggerService,
  INextService,
  NNextService,
} from '@Server/Types';

@injectable()
export class NextService extends AbstractService implements INextService {
  protected readonly _SERVICE_NAME = NextService.name;
  private readonly _isDev: boolean = false;

  private _CONFIG: NNextService.Config | undefined;
  private _NEXT_SERVER: Next.NextServer | undefined;
  private _APP_SERVER: Express.ServerInstance | undefined;

  constructor(
    @inject(ServerSymbols.DiscoveryService)
    protected readonly _discoveryService: IDiscoveryService,
    @inject(ServerSymbols.LoggerService)
    protected readonly _loggerService: ILoggerService
  ) {
    super();

    this._isDev = process.env.NODE_ENV !== 'production';
  }

  private _setConfig() {
    this._CONFIG = {
      protocol: this._discoveryService.getString('adapters.http.protocol', 'http'),
      host: this._discoveryService.getString('adapters.http.host', 'localhost'),
      port: this._discoveryService.getNumber('adapters.http.port', 3000),
    };
  }

  private get _config(): NNextService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  protected async init(): Promise<boolean> {
    this._setConfig();

    this._NEXT_SERVER = next({ dev: this._isDev, customServer: true });
    this._APP_SERVER = express();

    try {
      await this.run();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected async destroy(): Promise<void> {
    this._CONFIG = undefined;
    this._NEXT_SERVER = undefined;
    this._APP_SERVER = undefined;
  }

  public async run(): Promise<void> {
    if (!this._NEXT_SERVER) {
      throw new Error('Next server not initialize.');
    }

    if (!this._APP_SERVER) {
      throw new Error('Application server not initialize.');
    }

    const { protocol, host, port } = this._config;
    const nextHandler = this._NEXT_SERVER?.getRequestHandler();

    try {
      await this._NEXT_SERVER.prepare();

      this._APP_SERVER.get('*', (req: express.Request, res: express.Response) => {
        return nextHandler(req, res);
      });

      this._APP_SERVER.listen(this._config.port, () => {
        console.log(`Application server running on ${protocol}://${host}:${port}`);
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
