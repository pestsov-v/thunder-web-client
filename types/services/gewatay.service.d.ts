import type { Axios } from '../packages';
import type { IAbstractService } from './abstract.service';
import type { HttpMethod } from '../utility';
import type { NHttpAdapter } from '../adapters';

export type ICombinationService = IAbstractService;

export namespace NGetawayService {
  export type Config = {
    protocol: string;
    host: string;
    port: number;
    urls: {
      baseApiUrl: string;
      baseExceptionUrl: string;
    };
  };
  export type SchemaRequestOptions<D = any> = {
    version?: string
    method?: HttpMethod
    scope?: NHttpAdapter.AuthScope
    headers?: Record<string, string>;
    params?: Record<string, string>;
    queries?: Record<string, NHttpAdapter.QueryParameter>;
    data?: D;
  };

  export type ResponsePayload<R> = {
    body: Axios.AxiosResponse<R>['data'];
    status: Axios.AxiosResponse<R>['status'];
    headers: Axios.AxiosResponse<R>['headers'];
    request: Axios.AxiosResponse<R>['request'];
  };
}
