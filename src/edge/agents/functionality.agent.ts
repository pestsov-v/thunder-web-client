import { injectable, inject } from '@Edge/Package';
import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { HttpMethod } from '@Utility/Types';
import type {
  IFunctionalityAgent,
  IGetawayService,
  INavigatorProvider,
  IStorageProvider,
  NFunctionalityAgent,
  NGetawayService,
} from '@Edge/Types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(EdgeSymbols.GetawayService)
    private readonly _getawayService: IGetawayService
  ) {}

  public get schema(): NFunctionalityAgent.Schema {
    return {
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
      ): Promise<NGetawayService.ResponsePayload<Result>> => {
        return this._getawayService.schemaRequest<Route, Domain, Data, Result>(
          route,
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
}
