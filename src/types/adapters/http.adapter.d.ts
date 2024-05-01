import { HttpMethod } from '../utility';
import { NGetawayService } from '../services';

export interface IHttpAdapter {
  init(): boolean;
  destroy(): void;

  sendRequest<
    SERVICES extends string = string,
    DOMAIN extends string = string,
    ROUTE extends string = string,
    DATA = any,
    RESULT = void,
  >(
    service: SERVICES,
    domain: DOMAIN,
    route: ROUTE,
    method: HttpMethod,
    config?: NGetawayService.SchemaRequestOptions<DATA>
  ): Promise<NGetawayService.ResponsePayload<RESULT>>;
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
}
