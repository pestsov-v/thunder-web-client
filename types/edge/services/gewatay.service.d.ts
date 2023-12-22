import { IAbstractService } from './abstract.service';
import { HttpMethod } from '@Utility/Types';
import { Axios } from '@Edge/Package/Types';

export interface IGetawayService extends IAbstractService {
  schemaRequest<T extends NGetawayService.SchemaConfig = NGetawayService.SchemaConfig, R = void>(
    config: NGetawayService.SchemaRequestOptions<T>
  ): Promise<NGetawayService.ResponsePayload<R>>;

  baseRequest<T, R>(
    config: Axios.AxiosRequestConfig<T>
  ): Promise<NGetawayService.ResponsePayload<R>>;
}

export namespace NGetawayService {
  export type Config = {
    protocol: string;
    host: string;
    port: number;
    urls: {
      baseApiUrl: string;
    };
  };
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

  export type ServerResponseType =
    | 'info'
    | 'redirect'
    | 'success'
    | 'error'
    | 'validation'
    | 'authenticated'
    | 'fail';

  export type ResponsePayload<R> = {
    data: Axios.AxiosResponse<R>['data'];
    status: Axios.AxiosResponse<R>['status'];
    headers: Axios.AxiosResponse<R>['headers'];
    request: Axios.AxiosResponse<R>['request'];
  };
}
