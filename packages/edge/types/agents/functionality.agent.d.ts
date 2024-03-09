import { IAuthService, NGetawayService } from '../services';
import { INavigatorProvider, IStorageProvider } from '../providers';
import { HttpMethod } from '../utility';

export interface IFunctionalityAgent {
  readonly schema: NFunctionalityAgent.Schema;
  readonly storage: NFunctionalityAgent.Storage;
  readonly navigator: NFunctionalityAgent.Navigator;
  readonly auth: NFunctionalityAgent.Auth;
}

export namespace NFunctionalityAgent {
  export type Schema = {
    sendRequest: <
      Service extends string = string,
      Domain extends string = string,
      Route extends string = string,
      Data = any,
      Result = void,
    >(
      service: Service,
      domain: Domain,
      route: Route,
      method: HttpMethod,
      config?: NGetawayService.SchemaRequestOptions<Data>
    ) => Promise<NGetawayService.ResponsePayload<Result>>;
  };

  export type Storage = {
    readonly localStorage: IStorageProvider['localStorage'];
    readonly sessionStorage: IStorageProvider['sessionStorage'];
  };

  export type Navigator = {
    readonly cookieEnabled: INavigatorProvider['cookieEnabled'];
    readonly isOnline: INavigatorProvider['isOnline'];
    readonly userAgent: INavigatorProvider['userAgent'];
    readonly networkInfo: INavigatorProvider['networkInfo'];
    readonly defaultLanguage: INavigatorProvider['defaultLanguage'];
    readonly supportedLanguages: INavigatorProvider['supportedLanguages'];

    readonly useCoordinates: INavigatorProvider['useCoordinates'];
  };

  export type Auth = {
    readonly getUserJWTPayload: IAuthService['getUserJWTPayload'];
    readonly getOrgJWTPayload: IAuthService['getOrgJWTPayload'];
    readonly resolveUserAccessExp: IAuthService['resolveUserAccessExp'];
    readonly resolveOrgAccessExp: IAuthService['resolveOrgAccessExp'];
    readonly setUserAuthJWTPayload: IAuthService['setUserAuthJWTPayload'];
    readonly setOrgAuthJWTPayload: IAuthService['setOrgAuthJWTPayload'];
    readonly updateUserAccessToken: IAuthService['updateUserAccessToken'];
    readonly updateOrgAccessToken: IAuthService['updateOrgAccessToken'];
  };
}
