import type { IAbstractService } from './abstract.service';
import type { FC } from 'react';
import type { IFunctionalityAgent } from '../agents';
import type { NSessionService } from './session.service';
import type { AnyObject, EnvironmentKind, HttpMethod, Nullable } from '@Utility/Types';
import { Zustand } from '@Edge/Package/Types';
import { z } from 'zod';

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

  export type ValidateHandler = <T = any>(
    validator: z.ZodObject<T>,
    body: T
  ) => Nullable<z.ZodError>;

  export type StoreStorageKind = 'localStorage' | 'sessionStorage';
  export type StorePersistenceKind = 'persist' | 'vanish';

  export type Store<S = AnyObject, T = AnyObject> = {
    initialState: S;
    actions: Zustand.Actions<T>;
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
    store: Map<string, Store>;
  };
  export type Schema = Map<string, Domain>;
}
