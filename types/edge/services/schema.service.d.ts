import { IAbstractService } from './abstract.service';
import { EnvironmentKind, HttpMethod } from '@Utility/Types';

export interface ISchemaService extends IAbstractService {
  readonly schema: NSchemaService.Schema;
}

export namespace NSchemaService {
  export type Route = {
    environment: EnvironmentKind;
    method: HttpMethod;
    service: string;
    domain: string;
    action: string;
    isPrivateUser?: boolean;
    isPrivateOrganization?: boolean;
  };

  export type Domain = {
    routes: Map<string, Route>;
  };
  export type Schema = Map<string, Domain>;
}
