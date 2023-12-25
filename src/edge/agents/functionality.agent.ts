import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import type {
  IFunctionalityAgent,
  IGetawayService,
  IStoragePort,
  NFunctionalityAgent,
  NGetawayService,
} from '@Edge/Types';
import { HttpMethod } from '@Utility/Types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(EdgeSymbols.GetawayService)
    private readonly _getawayService: IGetawayService,
    @inject(EdgeSymbols.StoragePort)
    private readonly _storagePort: IStoragePort
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
    return {
      localStorage: this._storagePort.localStorage,
      sessionStorage: this._storagePort.sessionStorage,
    };
  }
}
