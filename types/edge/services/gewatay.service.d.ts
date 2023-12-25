import type { Axios } from '@Edge/Package/Types';
import type { HttpMethod } from '@Utility/Types';
import type { IAbstractService } from './abstract.service';

export interface IGetawayService extends IAbstractService {
  schemaRequest: <
    Route extends string = string,
    Domain extends string = string,
    Data = any,
    Result = void,
  >(
    route: Route,
    domain: Domain,
    method: HttpMethod,
    config?: NGetawayService.SchemaRequestOptions<Data>
  ) => Promise<NGetawayService.ResponsePayload<Result>>;

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
  export type SchemaConfig<R extends string = string, D extends string = string> = {
    domain: R;
    route: D;
    method: HttpMethod;
  };

  export type SchemaRequestOptions<D = any> = {
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

  export type ServerResponse = {
    responseType: ServerResponseType;
  };

  export type ResponsePayload<R> = {
    data: Axios.AxiosResponse<R>['data'];
    status: Axios.AxiosResponse<R>['status'];
    headers: Axios.AxiosResponse<R>['headers'];
    request: Axios.AxiosResponse<R>['request'];
  };
}
