import { IAbstractService } from './abstract.service';
import { HttpMethod } from '@Utility/Types';
import { Axios } from '@Edge/Package/Types';

export interface IGetawayService extends IAbstractService {
  schemaRequest<T extends NGetawayService.SchemaConfig = NGetawayService.SchemaConfig>(
    config: NGetawayService.SchemaRequestOptions<T>
  ): Promise<void>;

  baseRequest<T>(config: Axios.AxiosRequestConfig<T>): Promise<void>;
}

export namespace NGetawayService {
  export type SchemaConfig = {
    domain: string;
    route: string;
    method: HttpMethod;
  };

  export type SchemaRequestOptions<T extends SchemaConfig, D = any> = {
    domain: T['domain'];
    route: T['route'];
    method: T['method'];
    data?: D;
  };
}
