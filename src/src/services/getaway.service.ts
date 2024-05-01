import { injectable, inject } from '~package';
import { CoreSymbols } from '~symbols';
import { AbstractService } from './abstract.service';

import type { IGetawayService, IHttpAdapter, IWsAdapter } from '~types';

@injectable()
export class GetawayService extends AbstractService implements IGetawayService {
  protected _SERVICE_NAME = GetawayService.name;

  constructor(
    @inject(CoreSymbols.HttpAdapter)
    private readonly _httpAdapter: IHttpAdapter,
    @inject(CoreSymbols.WsAdapter)
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
