import { IAuthService, IDiscoveryService } from '../services';
import { INavigatorProvider, IStorageProvider } from '../providers';
import { IHttpAdapter, IWsAdapter } from '../adapters';

export interface IFunctionalityAgent {
  readonly auth: NFunctionalityAgent.Auth;
  readonly discovery: NFunctionalityAgent.Discovery;
  readonly event: NFunctionalityAgent.Event;
  readonly route: NFunctionalityAgent.Route;
  readonly storage: NFunctionalityAgent.Storage;
  readonly navigator: NFunctionalityAgent.Navigator;
}

export namespace NFunctionalityAgent {
  export type Discovery = {
    getMandatory: IDiscoveryService['getSchemaMandatory'];
    getString: IDiscoveryService['getSchemaString'];
    getNumber: IDiscoveryService['getSchemaNumber'];
    getBoolean: IDiscoveryService['getSchemaBoolean'];
    getArray: IDiscoveryService['getSchemaArray'];
  };

  export type Route = {
    request: IHttpAdapter['request'];
  };

  export type Storage = {
    readonly localStorage: IStorageProvider['localStorage'];
    readonly sessionStorage: IStorageProvider['sessionStorage'];
  };

  export type Event = {
    once: IWsAdapter['once'];
    subscribe: IWsAdapter['subscribe'];
    publish: IWsAdapter['publish'];
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
