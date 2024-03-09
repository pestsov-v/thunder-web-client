import { injectable, inject } from '@Edge/Package';
import { container } from '@Edge/Container';
import { EdgeSymbols } from '@Edge/Symbols';

import type {
  HttpMethod,
  IAuthService,
  IFunctionalityAgent,
  IHttpAdapter,
  INavigatorProvider,
  IStorageProvider,
  NFunctionalityAgent,
  NGetawayService,
  NSessionService,
} from '@Edge/Types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(EdgeSymbols.HttpAdapter)
    private readonly _httpAdapter: IHttpAdapter,
    @inject(EdgeSymbols.AuthService)
    private readonly _authService: IAuthService
  ) {}

  public get schema(): NFunctionalityAgent.Schema {
    return {
      sendRequest: <
        Route extends string = string,
        Service extends string = string,
        Domain extends string = string,
        Data = any,
        Result = void,
      >(
        route: Route,
        service: Service,
        domain: Domain,
        method: HttpMethod,
        config?: NGetawayService.SchemaRequestOptions<Data>
      ): Promise<NGetawayService.ResponsePayload<Result>> => {
        return this._httpAdapter.sendRequest<Route, Service, Domain, Data, Result>(
          route,
          service,
          domain,
          method,
          config
        );
      },
    };
  }

  public get storage(): NFunctionalityAgent.Storage {
    const provider = container.get<IStorageProvider>(EdgeSymbols.StorageProvider);

    return {
      localStorage: provider.localStorage,
      sessionStorage: provider.sessionStorage,
    };
  }

  public get navigator(): NFunctionalityAgent.Navigator {
    const provider = container.get<INavigatorProvider>(EdgeSymbols.NavigatorProvider);

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
