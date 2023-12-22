import { injectable, inject, axios } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { GetawayHeaders } from '@Edge/Common';
import { AbstractService } from './abstract.service';

import type { Axios } from '@Edge/Package/Types';
import type {
  IGetawayService,
  ISchemaService,
  NGetawayService,
  IDiscoveryService,
} from '@Edge/Types';

@injectable()
export class GetawayService extends AbstractService implements IGetawayService {
  protected _SERVICE_NAME = GetawayService.name;

  private _REQUESTER: Axios.AxiosInstance | undefined;
  private _CONFIG: NGetawayService.Config | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  private _setConfig() {
    this._CONFIG = {
      protocol: 'http',
      host: 'localhost',
      port: 11033,
      urls: {
        baseApiUrl: '/v1/call/api/',
      },
    };
  }

  private get _config(): NGetawayService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  protected init(): boolean {
    this._setConfig();

    const { protocol, host, port } = this._config;
    this._REQUESTER = axios.create({ baseURL: `${protocol}://${host}:${port}` });
    return true;
  }

  protected destroy(): void {
    this._REQUESTER = undefined;
  }

  private get _requester(): Axios.AxiosInstance {
    if (!this._REQUESTER) {
      throw new Error('Axios instance not initialize.');
    }
    return this._REQUESTER;
  }

  public async schemaRequest<
    T extends NGetawayService.SchemaConfig = NGetawayService.SchemaConfig,
    R = void,
  >(config: NGetawayService.SchemaRequestOptions<T>): Promise<NGetawayService.ResponsePayload<R>> {
    const dStorage = this._schemaService.schema.get(config.domain);
    if (!dStorage) {
      throw new Error(`Domain storage "${config.domain}" not found.`);
    }

    const path = config.route + '{{' + config.method.toString() + '}}';
    const route = dStorage.routes.get(path);
    if (!route) {
      throw new Error(
        `Route structure "${config.route}" not exists in "${config.domain}" domain storage.`
      );
    }

    const headers = {
      [GetawayHeaders.SERVICE]: route.service,
      [GetawayHeaders.DOMAIN]: route.domain,
      [GetawayHeaders.ACTION]: route.action,
      'accept-language': 'en',
    };

    try {
      return await this.baseRequest({
        url: this._config.urls.baseApiUrl,
        method: route.method,
        headers: headers,
        data: config.data,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  public async baseRequest<T, R>(
    config: Axios.AxiosRequestConfig<T>
  ): Promise<NGetawayService.ResponsePayload<R>> {
    try {
      const response = await this._requester.request(config);
      return {
        data: response.data,
        status: response.status,
        headers: response.headers,
        request: response.request,
      };
    } catch (e) {
      if (e instanceof axios.AxiosError) {
        return this._resolveAxiosError(e);
      }
      throw e;
    }
  }

  private _resolveAxiosError(e: Axios.AxiosError): NGetawayService.ResponsePayload<unknown> {
    let data: NGetawayService.ResponsePayload<unknown>;
    if (e.response) {
      data = {
        status: e.response.status,
        headers: e.response.headers,
        request: e.response.request,
        data: e.response.data,
      };
    } else {
      data = {
        status: 500,
        headers: {},
        request: {},
        data: {},
      };
    }

    return data;
  }
}
