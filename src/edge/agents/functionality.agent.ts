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
      sendRequest: <T extends NGetawayService.SchemaConfig>(
        config: NGetawayService.SchemaRequestOptions<T>
      ): Promise<void> => {
        return this._getawayService.schemaRequest<T>(config);
      },
    };
  }

  public get storage(): NFunctionalityAgent.Storage {
    return {
      localStorage: this._storagePort.localStorage,
      sessionStorage: this._storagePort.localStorage,
    };
  }
}
