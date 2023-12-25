import { NGetawayService } from '../services';
import { IStoragePort } from '../ports';
import { HttpMethod } from '@Utility/Types';

export interface IFunctionalityAgent {
  readonly schema: NFunctionalityAgent.Schema;
  readonly storage: NFunctionalityAgent.Storage;
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
    readonly localStorage: IStoragePort['localStorage'];
    readonly sessionStorage: IStoragePort['sessionStorage'];
  };
}
