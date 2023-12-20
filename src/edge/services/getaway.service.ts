import { injectable, inject, axiosCreate } from '@Edge/Package';
import { AbstractService } from './abstract.service';

import type { Axios } from '@Edge/Package/Types';
import type { IGetawayService, ISchemaService, NGetawayService } from '@Edge/Types';
import { EdgeSymbols } from '@EdgeSymbols';
import { GetawayHeaders } from '@Edge/Common';

@injectable()
export class GetawayService extends AbstractService implements IGetawayService {
  private _REQUESTER: Axios.AxiosInstance | undefined;
  protected _SERVICE_NAME = GetawayService.name;

  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  protected init(): boolean {
    this._REQUESTER = axiosCreate({ url: 'http://localhost:11043' });
    return true;
  }

  protected destroy(): void {
    this._REQUESTER = undefined;
  }

  private get _requester(): Axios.AxiosInstance {
    if (!this._REQUESTER) {
      throw new Error('Axios instance not initialize.');
    }

    return this._REQUESTER();
  }

  public async schemaRequest<T extends NGetawayService.SchemaConfig = NGetawayService.SchemaConfig>(
    config: NGetawayService.SchemaRequestOptions<T>
  ): Promise<void> {
    const dStorage = this._schemaService.schema.get(config.domain);
    if (!dStorage) {
      throw new Error(`Domain storage "${config.domain}" not found.`);
    }

    const path = config.route + '{{' + config.method.toString() + '}}';
    const route = dStorage.routes.get(path);
    if (!route) {
      throw new Error(
        `Route structure "${config.route}" not exists in "${config.domain}" domain storage.`
      );
    }

    const headers = {
      [GetawayHeaders.SERVICE]: route.service,
      [GetawayHeaders.DOMAIN]: route.domain,
      [GetawayHeaders.ACTION]: route.action,
    };

    try {
      return await this.baseRequest({
        url: '/v1/call/api/',
        method: route.method,
        headers: headers,
        data: config.data,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  public async baseRequest<T>(config: Axios.AxiosRequestConfig<T>): Promise<void> {
    try {
      return this._requester(config);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}