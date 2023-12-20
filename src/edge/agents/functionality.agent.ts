import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import type { IFunctionalityAgent, IGetawayService, NFunctionalityAgent } from '@Edge/Types';
import { NGetawayService } from '@Edge/Types';

@injectable()
export class FunctionalityAgent implements IFunctionalityAgent {
  constructor(
    @inject(EdgeSymbols.GetawayService)
    private readonly _getawayService: IGetawayService
  ) {}

  public get schema(): NFunctionalityAgent.Schema {
    return {
      sendRequest: <T>(config: NGetawayService.SchemaRequestOptions<T>): Promise<void> => {
        return this._getawayService.schemaRequest(config);
      },
    };
  }
}
