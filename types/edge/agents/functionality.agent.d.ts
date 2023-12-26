import { NGetawayService } from '../services';
import { INavigatorProvider, IStorageProvider } from '../providers';
import { HttpMethod } from '@Utility/Types';

export interface IFunctionalityAgent {
  readonly schema: NFunctionalityAgent.Schema;
  readonly storage: NFunctionalityAgent.Storage;
  readonly navigator: NFunctionalityAgent.Navigator;
}

export namespace NFunctionalityAgent {
  export type Schema = {
    sendRequest: <
      Route extends string = string,
      Domain extends string = string,
      Data = any,
      Result = void,
    >(
      route: Route,
      domain: Domain,
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
}
