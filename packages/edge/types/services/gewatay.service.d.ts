import type { Axios } from '../packages/packages';
import type { IAbstractService } from './abstract.service';
import type { NSentryIntegration } from '../integrations';
import type { HttpMethod } from '../utility';

export type IGetawayService = IAbstractService;

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
    body: Axios.AxiosResponse<R>['data'];
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
