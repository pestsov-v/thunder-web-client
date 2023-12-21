import { IAbstractService } from './abstract.service';

export interface ISessionService extends IAbstractService {
  readonly one: boolean;
}

export namespace NSessionService {
  export type ServerEventType = 'server:handshake';
  export type ServerHandshakePayload = {
    serverTag: string;
    connectionId: string;
    service: string;
  };

  export type ClientEventType =
    | 'client:session:to:session'
    | 'client:broadcast:to:app'
    | 'client:broadcast:to:room';

  export type SchemaEventStructure<E extends string, P = undefined> = {
    event: E;
    payload?: P;
  };

  export type EventStructure<E extends ServerEventPayload = ServerEventPayload, P = undefined> = {
    event: ServerEventType;
    payload: ServerEventPayload<E, P>;
  };

  export type ServerEventPayload<
    E extends ServerEventType,
    P = undefined,
  > = E extends 'server:handshake' ? ServerHandshakePayload : never;

  export type EventHandler<E extends ServerEventType> = (payload: ServerEventPayload<E>) => void;

  export type EventHandlers<E extends ServerEventType = ServerEventType> = {
    [key in E]: EventHandler<key>;
  };
}