import { IGetawayService } from '../services';

export interface IFunctionalityAgent {
  readonly get schema: NFunctionalityAgent.Schema
}

export namespace NFunctionalityAgent {
  export type Schema = {
    sendRequest: IGetawayService['schemaRequest']
  }
}
