import { HttpMethod } from '../utility';
import { NGetawayService } from '../services';

export interface IHttpAdapter {
  init(): boolean;
  destroy(): void;

  sendRequest<
    Route extends string = string,
    SERVICES extends string = string,
    Domain extends string = string,
    Data = any,
    Result = void,
  >(
    route: Route,
    service: SERVICES,
    domain: Domain,
    method: HttpMethod,
    config?: NGetawayService.SchemaRequestOptions<Data>
  ): Promise<NGetawayService.ResponsePayload<Result>>;
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
