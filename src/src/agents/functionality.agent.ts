import { injectable, inject } from '~package';
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

  public get getaway(): NFunctionalityAgent.getaway {
    return {
      sendRequest: <
        SERVICE extends string = string,
        DOMAIN extends string = string,
        ROUTE extends string = string,
        DATA = any,
        RESULT = void,
      >(
        service: SERVICE,
        domain: DOMAIN,
        route: ROUTE,
        method: HttpMethod,
        config?: NGetawayService.SchemaRequestOptions<DATA>
      ): Promise<NGetawayService.ResponsePayload<RESULT>> => {
        return this._httpAdapter.sendRequest<SERVICE, DOMAIN, ROUTE, DATA, RESULT>(
          service,
          domain,
          route,
          method,
          config
        );
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
