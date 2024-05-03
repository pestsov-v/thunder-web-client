import { injectable, inject } from '~packages';
import { container } from '~container';
import { CoreSymbols } from '~symbols';

import type {
  AnyObject,
  HttpMethod,
  IAuthService,
  IDiscoveryService,
  IFunctionalityAgent,
  IHttpAdapter,
  INavigatorProvider,
  IStorageProvider,
  IWsAdapter,
  KeyConfigLiteralBuilder,
  NFunctionalityAgent,
  NGetawayService,
  NSessionService,
} from '~types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.HttpAdapter)
    private readonly _httpAdapter: IHttpAdapter,
    @inject(CoreSymbols.WsAdapter)
    private readonly _wsAdapter: IWsAdapter,
    @inject(CoreSymbols.AuthService)
    private readonly _authService: IAuthService
  ) {}

  public get discovery(): NFunctionalityAgent.Discovery {
    return {
      getMandatory: <T extends string | number | boolean, C extends AnyObject>(
        name: KeyConfigLiteralBuilder<C, T>
      ) => {
        return this._discoveryService.getSchemaMandatory<T, C>(name);
      },
      getString: <C extends AnyObject>(
        name: KeyConfigLiteralBuilder<C, string>,
        def: string
      ): string => {
        return this._discoveryService.getSchemaString<C>(name, def);
      },
      getNumber: <C extends AnyObject>(
        name: KeyConfigLiteralBuilder<C, number>,
        def: number
      ): number => {
        return this._discoveryService.getSchemaNumber<C>(name, def);
      },
      getBoolean: <C extends AnyObject>(
        name: KeyConfigLiteralBuilder<C, boolean>,
        def: boolean
      ): boolean => {
        return this._discoveryService.getSchemaBoolean<C>(name, def);
      },
      getArray: <T extends string | number | boolean, C extends AnyObject>(
        name: KeyConfigLiteralBuilder<C, Array<T>>,
        def: Array<T>
      ): Array<T> => {
        return this._discoveryService.getSchemaArray<T, C>(name, def);
      },
    };
  }

  public get event(): NFunctionalityAgent.Event {
    return {
      once: (type, version, event, listener) => {
        return this._wsAdapter.once(type, version, event, listener);
      },
      subscribe: (type, version, event, listener) => {
        return this._wsAdapter.subscribe(type, version, event, listener);
      },
      publish: (event) => {
        return this._wsAdapter.publish(event);
      },
    };
  }

  public get route(): NFunctionalityAgent.Route {
    return {
      request: <
        S extends string = string,
        D extends string = string,
        RO extends string = string,
        DA = any,
        RE = void,
      >(
        service: S,
        domain: D,
        method: HttpMethod,
        route: RO,
        config?: NGetawayService.SchemaRequestOptions<DA>
      ): Promise<NGetawayService.ResponsePayload<RE>> => {
        return this._httpAdapter.request<S, D, RO, DA, RE>(service, domain, method, route, config);
      },
    };
  }

  public get storage(): NFunctionalityAgent.Storage {
    const provider = container.get<IStorageProvider>(CoreSymbols.StorageProvider);

    return {
      localStorage: provider.localStorage,
      sessionStorage: provider.sessionStorage,
    };
  }

  public get navigator(): NFunctionalityAgent.Navigator {
    const provider = container.get<INavigatorProvider>(CoreSymbols.NavigatorProvider);

    return {
      cookieEnabled: provider.cookieEnabled,
      isOnline: provider.isOnline,
      userAgent: provider.userAgent,
      networkInfo: provider.networkInfo,
      defaultLanguage: provider.defaultLanguage,
      supportedLanguages: provider.supportedLanguages,
      useCoordinates: (successCallback, errorCallback) => {
        return provider.useCoordinates(successCallback, errorCallback);
      },
    };
  }

  public get auth(): NFunctionalityAgent.Auth {
    return {
      getUserJWTPayload: <
        T extends NSessionService.SessionIdentifiers = NSessionService.SessionIdentifiers,
      >() => {
        return this._authService.getUserJWTPayload<T>();
      },
      getOrgJWTPayload: <
        T extends NSessionService.OrganizationIdentifiers = NSessionService.OrganizationIdentifiers,
      >() => {
        return this._authService.getOrgJWTPayload<T>();
      },
      resolveUserAccessExp: () => {
        return this._authService.resolveUserAccessExp();
      },
      resolveOrgAccessExp: () => {
        return this._authService.resolveOrgAccessExp();
      },
      setUserAuthJWTPayload: (access: string, refresh: string) => {
        return this._authService.setUserAuthJWTPayload(access, refresh);
      },
      setOrgAuthJWTPayload: (access: string, refresh: string) => {
        return this._authService.setOrgAuthJWTPayload(access, refresh);
      },
      updateUserAccessToken: (token) => {
        return this._authService.updateUserAccessToken(token);
      },
      updateOrgAccessToken: (token) => {
        return this._authService.updateOrgAccessToken(token);
      },
    };
  }
}
