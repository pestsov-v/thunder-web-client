import { IAbstractService } from './abstract.service';
import { EnvironmentKind, HttpMethod } from '@Utility/Types';
import { FC } from 'react';

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

  export type Dictionary = Record<string, Dictionary | string>;
  export type View<P> = FC<P>;

  export type Domain = {
    routes: Map<string, Route>;
    dictionaries: Map<string, Dictionary>;
    views: Map<string, View>;
  };
  export type Schema = Map<string, Domain>;
}
