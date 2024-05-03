import { NSchemaService } from '../services';
import { AnyFunction } from '../utility';

export interface IWsAdapter {
  init(): boolean;
  destroy(): void;

  once<E extends string = string>(
    type: NWsAdapter.EventType,
    version: string,
    event: E,
    listener: AnyFunction
  ): void;
  subscribe<E extends string = string>(
    type: NWsAdapter.EventType,
    version: string,
    event: E,
    listener: AnyFunction
  ): void;
  publish(event: NSchemaService.ServerEvent): void;
}

export namespace NWsAdapter {
  export type Config = {
    enable: boolean;
    protocol: string;
    host: string;
    port: number;
  };

  export type EventType = 'session:to:session' | 'session:to:room' | 'session:to:service';
  export type Version = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | string;
  export type AuthScope = 'public:event' | 'private:user' | 'private:system';

  export type SessionToSession = {
    sessionId: string;
  };
  export type SessionToRoom = {
    roomId: string;
  };
  export type SessionToService = {
    service: string;
  };

  export type EventPayload<E extends EventType = EventType> = E extends 'session:to:session'
    ? SessionToSession
    : E extends 'session:to:room'
      ? SessionToRoom
      : E extends 'session:to:service'
        ? SessionToService
        : never;

  export type Event<T extends EventType = EventType, D = unknown> = {
    service: string;
    domain: string;
    event: string;
    type: T;
    version: Version;
    scope: AuthScope;
    payload: EventPayload<T>;
    data: D;
  };
}
