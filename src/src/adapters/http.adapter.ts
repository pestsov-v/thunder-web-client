import { injectable, inject, axios } from '~package';
import { container } from '~container';
import { CoreSymbols } from '~symbols';
import { SchemaHeaders } from '../common';

import type {
  Axios,
  HttpMethod,
  IAuthService,
  IDiscoveryService,
  IHttpAdapter,
  INavigatorProvider,
  ISchemaService,
  NGetawayService,
  NHttpAdapter,
  NSchemaService,
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

  public async sendRequest<
    ROUTE extends string = string,
    SERVICES extends string = string,
    DOMAIN extends string = string,
    DATA = any,
    RESULT = void,
  >(
    service: SERVICES,
    domain: DOMAIN,
    route: ROUTE,
    method: HttpMethod,
    config?: NGetawayService.SchemaRequestOptions<DATA>
  ): Promise<NGetawayService.ResponsePayload<RESULT>> {
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

      throw new Error(`Domain storage "${domain}" in service "${service}" not found. ${msg}`);
    }

    const sRoute = dStorage.routes.get(route + '{{' + method.toUpperCase() + '}}');
    if (!sRoute) {
      const routes = Array.from(dStorage.routes.keys());
      let msg: string;
      if (routes.length > 0) {
        msg = 'Domain storage is empty.';
      } else {
        const endpoints = routes.map((r) => {
          const chunks = r.replace('-', '{{').replace('', '}}').split('-');
          return `Route path "${chunks[0]}" with HTTP Method ${chunks[1]}`;
        });
        msg = `Available next domains: ${endpoints.join(', ')}. `;
      }

      throw new Error(
        `Route path "${route}" with method "${method}" in domain storage "${domain}" in service "${service}" not found. ${msg}`
      );
    }

    const navigator = container.get<INavigatorProvider>(CoreSymbols.NavigatorProvider);

    const headers: Record<string, string> = {
      [SchemaHeaders.X_SERVICE_NAME]: service,
      [SchemaHeaders.X_DOMAIN_NAME]: domain,
      [SchemaHeaders.X_ACTION_NAME]: sRoute.route,
      'accept-language': navigator.defaultLanguage.shortLn,
      ...this._resolveRouteScope(service, sRoute.scope),
    };

    const { protocol, host, port } = this._config;
    try {
      const response = await this._requester.request({
        url: `${protocol}://${host}:${port}${this._config.urls.baseApiUrl}`,
        method: sRoute.method,
        headers: headers,
        data: config?.data,
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

  private _resolveRouteScope(
    service: string,
    scope: NSchemaService.AuthScope
  ): Record<string, string> {
    let headers: Record<string, string> = {};

    switch (scope) {
      case 'public:route':
        headers = {};
        break;
      case 'private:user':
        headers = {
          ...this._resolvePrivateUser(service),
        };
        break;
      case 'private:organization':
        headers = {
          ...this._resolvePrivateUser(service),
          ...this._resolvePrivateOrg(service),
        };
        break;
    }

    return headers;
  }

  private _resolvePrivateUser(service: string): Record<string, string> {
    let headers = {};

    const payload = this._authService.userTokens;
    const token = '';

    switch (payload.status) {
      case 'access:actual':
        headers = {
          [SchemaHeaders.X_USER_ACCESS_TOKEN]: payload.access,
        };
        break;
      case 'access:expired':
        // TODO: add root handler

        headers = {
          [SchemaHeaders.X_USER_ACCESS_TOKEN]: token,
        };
        break;
      case 'refresh:expired':
        // TODO: add root handler

        break;
    }

    return headers;
  }

  private _resolvePrivateOrg(service: string): Record<string, string> {
    let headers = {};

    const token = '';

    const payload = this._authService.orgTokens;

    switch (payload.status) {
      case 'access:actual':
        headers = {
          [SchemaHeaders.X_ORGANIZATION_ACCESS_TOKEN]: payload.access,
        };
        break;
      case 'access:expired':
        // TODO: add root handler

        headers = {
          [SchemaHeaders.X_ORGANIZATION_ACCESS_TOKEN]: token,
        };
        break;
      case 'refresh:expired':
        // TODO: add root handler

        break;
    }

    return headers;
  }
}
