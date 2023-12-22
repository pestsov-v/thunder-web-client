import { IAbstractService } from './abstract.service';
import { AnyObject, EnvironmentKind, HttpMethod } from '@Utility/Types';
import { FC } from 'react';
import { IFunctionalityAgent } from '../agents';
import { NSessionService } from './session.service';

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

  export type Agents = {
    fnAgent: IFunctionalityAgent;
  };

  export type Context<D = any> = {
    body?: D;
  };

  export type ControllerHandler<R> = (agents: Agents, context: Context) => Promise<R | void>;
  export type WsListener = {
    type: NSessionService.ClientEventType | NSessionService.ClientEventType[];
    handler: ControllerHandler;
    isPrivateUser?: boolean; // default false
    isPrivateOrganization?: boolean; // default false
  };

  export type StoreStorageKind = 'localStorage' | 'sessionStorage';
  export type StorePersistenceKind = 'persist' | 'vanish';

  export type Store<S = AnyObject, T = AnyObject> = {
    initialState: S;
    storage?: StoreStorageKind; // default 'localStorage'
    persistence?: StorePersistenceKind; // default 'persist'
    partiality?: (state: S) => S; // default undefined
    version?: number; // default 1
    skipHydration?: boolean; // default true
  };

  export type Domain = {
    routes: Map<string, Route>;
    dictionaries: Map<string, Dictionary>;
    views: Map<string, View>;
    controllers: Map<string, ControllerHandler>;
    wsListeners: Map<string, WsListener>;
    store: Map<string, Store<unknown>>;
  };
  export type Schema = Map<string, Domain>;
}
