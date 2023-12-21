import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import type {
  IFunctionalityAgent,
  IGetawayService,
  IStoragePort,
  NFunctionalityAgent,
  NGetawayService,
} from '@Edge/Types';

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
      sendRequest: <T extends NGetawayService.SchemaConfig, R>(
        config: NGetawayService.SchemaRequestOptions<T>
      ): Promise<NGetawayService.ResponsePayload<R>> => {
        return this._getawayService.schemaRequest<T, R>(config);
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
