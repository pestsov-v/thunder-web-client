import type { Axios } from '../packages/packages';
import type { HttpMethod } from '../../common';
import type { IAbstractService } from './abstract.service';
import { NSentryIntegration } from '../integrations';

export interface IGetawayService extends IAbstractService {
  readonly schemaRequest: <
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

  readonly baseRequest<T, R>(
    config: Axios.AxiosRequestConfig<T>
  ): Promise<NGetawayService.ResponsePayload<R>>;
  readonly sendWebClientError<D extends string = string, P extends string = string>(
    exception: NGetawayService.WebClientErrorOptions<D, P>
  ): Promise<void>
}

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
    data?: D;
  };

  export type ResponsePayload<R> = {
    data: Axios.AxiosResponse<R>['data'];
    status: Axios.AxiosResponse<R>['status'];
    headers: Axios.AxiosResponse<R>['headers'];
    request: Axios.AxiosResponse<R>['request'];
  };

  export type WebClientErrorOptions<D extends string = string, P extends string = string> = {
    service: string;
    domain: D;
    action: P;
    method: HttpMethod;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
    userId?: string;
    sessionId?: string;
    connectionId?: string;
    level: NSentryIntegration.LogLevels;
    stack: string;
    timestamp?: number;
  };
}
