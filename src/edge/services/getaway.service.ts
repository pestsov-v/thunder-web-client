import { injectable, inject, axios } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { GetawayHeaders } from '@Edge/Common';
import { AbstractService } from './abstract.service';

import type { Axios } from '@Edge/Package/Types';
import type { HttpMethod } from '@Utility/Types';
import type {
  IGetawayService,
  ISchemaService,
  NGetawayService,
  IDiscoveryService,
  INavigatorProvider,
} from '@Edge/Types';
import { container } from '@EdgeContainer';

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
      protocol: this._discoveryService.getString('services.getaway.protocol', 'http'),
      host: this._discoveryService.getString('services.getaway.host', 'localhost'),
      port: this._discoveryService.getNumber('services.getaway.port', 11063),
      urls: {
        baseApiUrl: this._discoveryService.getString(
          'services.getaway.urls.baseApiUrl',
          '/v1/call/api'
        ),
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
    this._CONFIG = undefined;
  }

  private get _requester(): Axios.AxiosInstance {
    if (!this._REQUESTER) {
      throw new Error('Axios instance not initialize.');
    }
    return this._REQUESTER;
  }

  public async schemaRequest<
    Route extends string = string,
    Domain extends string = string,
    Data = any,
    Result = void,
  >(
    route: Route,
    domain: Domain,
    method: HttpMethod,
    config?: NGetawayService.SchemaRequestOptions<Data>
  ): Promise<NGetawayService.ResponsePayload<Result>> {
    const dStorage = this._schemaService.schema.get(domain);
    if (!dStorage) {
      throw new Error(`Domain storage "${domain}" not found.`);
    }

    const path = route + '{{' + method.toString() + '}}';
    const sRoute = dStorage.routes.get(path);
    if (!sRoute) {
      throw new Error(`Route structure "${route}" not exists in "${domain}" domain storage.`);
    }

    const headers = {
      [GetawayHeaders.SERVICE]: sRoute.service,
      [GetawayHeaders.DOMAIN]: sRoute.domain,
      [GetawayHeaders.ACTION]: sRoute.action,
      'accept-language': container.get<INavigatorProvider>(EdgeSymbols.NavigatorProvider)
        .defaultLanguage.shortLn,
    };

    try {
      return await this.baseRequest({
        url: this._config.urls.baseApiUrl,
        method: sRoute.method,
        headers: headers,
        data: config?.data,
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
