import { injectable, inject, axios } from '~packages';
import { CoreSymbols } from '~symbols';

import type {
  Axios, HttpMethod,
  IAuthService,
  IDiscoveryService,
  IHttpAdapter,
  ISchemaService,
  NGetawayService,
  NHttpAdapter,
} from '~types';

@injectable()
export class HttpAdapter implements IHttpAdapter {
  private _CONFIG: NHttpAdapter.Config | undefined;
  private _REQUESTER: Axios.AxiosInstance | undefined;

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(CoreSymbols.AuthService)
    private readonly _authService: IAuthService
  ) {}

  private _setConfig(): void {
    this._CONFIG = {
      protocol: this._discoveryService.getString('services.getaway.protocol', 'http'),
      host: this._discoveryService.getString('services.getaway.host', '0.0.0.0'),
      port: this._discoveryService.getNumber('services.getaway.port', 11000),
      urls: {
        baseApiUrl: this._discoveryService.getString(
          'services.getaway.urls.baseApiUrl',
          '/v1/call/api'
        ),
        baseExceptionUrl: this._discoveryService.getString(
          'services.getaway.urls.baseExceptionUrl',
          'v1/exception-tunnel'
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

  public init(): boolean {
    try {
      this._setConfig();

      this._REQUESTER = axios.create();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  public destroy(): void {
    this._CONFIG = undefined;
    this._REQUESTER = undefined;
  }

  private get _requester(): Axios.AxiosInstance {
    if (!this._REQUESTER) {
      throw new Error('Axios instance not initialize.');
    }
    return this._REQUESTER;
  }

  public async request<
    S extends string = string,
    D extends string = string,
    R extends string = string,
    DA = any,
    RES = any,
  >(service: S,
    domain: D,
    route: R, options: NHttpAdapter.RequestOptions<DA>): Promise<NHttpAdapter.Response<RES>> {
    const config: NHttpAdapter.RequestOptions = {
      method: options.method ?? 'GET',
      version: options.version ?? 'v1',
      scope: options.scope ?? 'public:route',
      data: options.data ?? null,
      headers: options.headers ?? undefined,
      params: options.params ?? undefined,
      queries: options.queries ?? undefined,
    };

    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      const services = Array.from(this._schemaService.services.keys());
      let msg: string;
      if (services.length > 0) {
        msg = 'Service storage is empty.';
      } else {
        msg = `Available next services: ${services.join(', ')}. `;
      }

      throw new Error(`Service storage "${service}" not found. ${msg}`);
    }

    const dStorage = sStorage.get(domain);
    if (!dStorage) {
      const domains = Array.from(sStorage.keys());
      let msg: string;
      if (domains.length > 0) {
        msg = 'Domain storage is empty.';
      } else {
        msg = `Available next domains: ${domains.join(', ')}. `;
      }

      throw new Error(
        `Domain storage "${domain}" in service "${service}" not found. ${msg}`
      );
    }

    const { protocol, host, port } = this._config;
    try {
      let queries = '';
      if (config.queries && Object.keys(config.queries).length > 0) {
        queries =
          '?' +
          Object.entries(config.queries)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
      }

      switch (config.scope) {
        case 'public:route':
          break;
        case 'private:route':
          break;
      }

      const response = await this._requester.request<RES>({
        url: `${protocol}://${host}:${port}${this._config.urls.baseApiUrl}/${service}${domain}/${config.version}/${route}${queries}`,
        headers: config.headers,
        method: options.method,
        data: options.data,
        params: options.params,
      });

      return {
        body: response.data,
        status: response.status,
        headers: response.headers,
        request: response.request,
      };
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
