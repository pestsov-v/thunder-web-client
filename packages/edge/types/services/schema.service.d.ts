import { JSX } from 'react';
import type { Zustand, Zod } from '../packages/packages';
import type { HttpMethod } from '../../common';

import type { IAbstractService } from './abstract.service';
import { IFunctionalityAgent, ISchemaAgent, NSchemaAgent } from '../agents';
import { NSessionService } from './session.service';
import { ExtendedRecordObject } from '../utility';
import { IStoreService } from './store.service';

export interface ISchemaService extends IAbstractService {
  readonly services: NSchemaService.Services;
}

export namespace NSchemaService {
  export type BaseContext = {
    rootStore: IStoreService['rootStore'];
  };

  export type PrivateUserContext<U> = BaseContext & {
    user: U;
  };

  export type PrivateOrgContext<U, O> = BaseContext & {
    user: U;
    organization: O;
  };

  export type RouteContext<U = any, O = any, K extends AuthScope> = K extends 'public:route'
    ? BaseContext
    : K extends 'private:user'
      ? PrivateUserContext<U>
      : K extends 'private:organization'
        ? PrivateOrgContext<U, O>
        : never;

  export type Handler<P = any, R = any, U = any, O = any, T extends AuthScope> = (
    agents: Agents,
    context: RouteContext<U, O, T>,
    payload: P
  ) => R;

  export interface AbstractRouteScope<P = any, R = any, U = any, O = any, T extends AuthScope>
    extends BaseScope {
    scope: T;
    handler: Handler<P, R, U, O, T>;
  }

  export type Controller<
    P = any,
    R = void,
    U = any,
    O = any,
    A extends AuthScope = AuthScope,
  > = A extends 'public:route'
    ? AbstractRouteScope<P, R, U, O, 'public:route'>
    : A extends 'private:user'
      ? AbstractRouteScope<P, R, U, O, 'private:user'>
      : A extends 'private:organization'
        ? AbstractRouteScope<P, R, U, O, 'private:organization'>
        : never;

  export type RouterSimple<E extends string> = {
    [key in E]: {
      [key in HttpMethod]?: Controller;
    };
  };

  export type RouteModify<E extends Record<string, Controller>> = {
    [key in keyof E]: {
      [M in HttpMethod]?: E[key];
    };
  };

  export type RouterAdvanced = {
    [key: string]: {
      [M in HttpMethod]?: Controller;
    };
  };

  export type Router<E extends string | Record<string, Controller> | RouterAdvanced> =
    E extends string
      ? RouterSimple<E>
      : E extends Record<string, Controller>
        ? RouteModify<E>
        : E extends RouterAdvanced
          ? E
          : never;

  export type Dictionary = Record<string, Dictionary | string>;
  export type View<P> = (
    agents: Agents,
    content: NSchemaAgent.ViewContext,
    props?: P
  ) => JSX.Element<P>;

  export type Agents = {
    fnAgent: IFunctionalityAgent;
    schemaAgent: ISchemaAgent;
  };

  export type Context<
    E extends NSessionService.EventType = NSessionService.EventType,
    IS_PRIVATE_USER extends boolean = false,
    IS_PRIVATE_ORG extends boolean = false,
  > = NSessionService.EventTypePayload<E, IS_PRIVATE_USER, IS_PRIVATE_ORG>;

  export type ControllerHandler<R> = (agents: Agents, context: Context) => Promise<R | void>;

  export type ValidateHandler = <T = void>() => Zod.ZodObject<Zod.ZodRawShape>;

  export type Validator<IN = void, OUT = void> = {
    inSchema?: ValidateHandler<IN>;
    outSchema?: ValidateHandler<OUT>;
  };

  export type StoreStorageKind = 'localStorage' | 'sessionStorage';
  export type StorePersistenceKind = 'persist' | 'vanish';

  export type Store<S = any, T = any> = {
    actions: Zustand.Actions<S, T>;
    storage?: StoreStorageKind; // default 'localStorage'
    persistence?: StorePersistenceKind; // default 'persist'
    partiality?: (state: S) => S; // default undefined
    version?: number; // default 1
    skipHydration?: boolean; // default true
  };

  export type EventContext<
    S extends AuthScope = AuthScope,
    K extends EventKind = EventKind,
  > = S extends 'public:route'
    ? { r: number }
    : S extends 'private:user'
      ? { u: string }
      : S extends 'private:organization'
        ? { l: boolean }
        : never;

  export type AuthScope = 'public:route' | 'private:user' | 'private:organization';
  export type EventType =
    | 'session:to:session'
    | 'session:to:session.error'
    | 'broadcast:to:service'
    | 'broadcast:to:service.error';

  export interface BaseScope {
    scope: AuthScope;
  }

  export interface AbstractListenerScope<
    K extends EventType = EventType,
    T extends AuthScope = AuthScope,
  > extends BaseScope {
    scope: T;
    handler: (agents: Agents, context: EventContext<T, K>) => Promise<void>;
  }

  export type WsListener<K extends EventType = EventType> =
    | AbstractListenerScope<K, 'public:route'>
    | AbstractListenerScope<K, 'private:user'>
    | AbstractListenerScope<K, 'private:organization'>;

  export type EmitterSimple<E extends string> = {
    [key in E]: {
      [M in EventType]?: WsListener;
    };
  };

  export type EmitterModify<E extends Record<string, WsListener>> = {
    [key in keyof E]: {
      [M in EventType]?: E[key];
    };
  };

  export type EmitterAdvanced = {
    [key: string]: {
      [M in EventType]?: WsListener;
    };
  };

  export type Emitter<E extends string | Record<string, WsListener> | EmitterAdvanced> =
    E extends string
      ? EmitterSimple<E>
      : E extends Record<string, WsListener>
        ? EmitterModify<E>
        : E extends EmitterAdvanced
          ? E
          : never;

  export type RouteStructure = {
    route: string;
    method: HttpMethod;
    scope: NSchemaService.Controller['scope'];
    handler: NSchemaService.Controller['handler'];
  };

  export type EventStructure = {
    event: string;
    type: EventType;
    scope: NSchemaService.WsListener['scope'];
    handler: NSchemaService.WsListener['handler'];
  };

  export type DictionaryStructure<L extends string, D extends ExtendedRecordObject> = {
    language: L;
    dictionary: D;
  };

  export type Domain = {
    routes: Map<string, RouteStructure>;
    events: Map<string, EventStructure>;
    dictionaries: Map<string, ExtendedRecordObject>;
    views: Map<string, NSchemaService.View<any>>;
    store?: Store;
    validators: Map<string, Validator>;
  };
  export type Domains = Map<string, Domain>;
  export type Services = Map<string, Domains>;
}
