import { injectable, inject, axios } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { AbstractService } from './abstract.service';

import type { IGetawayService, IHttpAdapter, IWsAdapter } from '@Edge/Types';

@injectable()
export class GetawayService extends AbstractService implements IGetawayService {
  protected _SERVICE_NAME = GetawayService.name;

  constructor(
    @inject(EdgeSymbols.HttpAdapter)
    private readonly _httpAdapter: IHttpAdapter,
    @inject(EdgeSymbols.WsAdapter)
    private readonly _wsAdapter: IWsAdapter
  ) {
    super();
  }

  protected init(): boolean {
    try {
      this._httpAdapter.init();
      this._wsAdapter.init();

      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  protected destroy(): void {
    try {
      this._httpAdapter.destroy();
      this._wsAdapter.destroy();
    } catch (e) {
      console.log(e);
    }
  }
}
