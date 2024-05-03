import { HttpMethod } from '../utility';
import type { Axios } from '../packages';

export interface IHttpAdapter {
  init(): boolean;
  destroy(): void;

  request<
    R extends string = string,
    S extends string = string,
    D extends string = string,
    DA = any,
    RES = any,
  >(
    route: R,
    options: NHttpAdapter.RequestOptions<S, D, DA>
  ): Promise<NHttpAdapter.Response<RES>>;
}

export namespace NHttpAdapter {
  export type Config = {
    protocol: string;
    host: string;
    port: number;
    urls: {
      baseApiUrl: string;
      baseExceptionUrl: string;
    };
  };

  export type QueryParameter =
    | 'string'
    | 'string[]'
    | 'number'
    | 'number[]'
    | 'boolean'
    | 'boolean[]';

  export type AuthScope = 'public:route' | 'private:route';
  export type RequestOptions<S extends string = string, D extends string = string, DA = any> = {
    service: S;
    domain: D;
    version?: string;
    scope?: AuthScope;
    method?: HttpMethod;
    data?: DA | null;
    headers?: Record<string, string>;
    params?: Record<string, string>;
    queries?: Record<string, QueryParameter>;
  };

  export type Response<R> = {
    body: Axios.AxiosResponse<R>['data'];
    status: Axios.AxiosResponse<R>['status'];
    headers: Axios.AxiosResponse<R>['headers'];
    request: Axios.AxiosResponse<R>['request'];
  };
}
