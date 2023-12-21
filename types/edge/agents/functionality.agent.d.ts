import { IGetawayService } from '../services';
import { IStoragePort } from '../ports';

export interface IFunctionalityAgent {
  readonly schema: NFunctionalityAgent.Schema;
  readonly storage: NFunctionalityAgent.Storage;
}

export namespace NFunctionalityAgent {
  export type Schema = {
    sendRequest: IGetawayService['schemaRequest'];
  };

  export type Storage = {
    readonly localStorage: IStoragePort['localStorage'];
    readonly sessionStorage: IStoragePort['sessionStorage'];
  };
}
