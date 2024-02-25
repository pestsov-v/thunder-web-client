import type { IAbstractService } from './abstract.service';

export interface ISessionService extends IAbstractService {
  useMediator<E extends NSessionService.ClientEvent = NSessionService.ClientEvent>(
    socket: WebSocket,
    event: E,
    payload: NSessionService.EventPayload<E>
  ): Promise<void>;
}

export namespace NSessionService {
  export type Config = {
    enable: boolean;
    connect: {
      protocol: 'ws' | 'wss';
      host: string;
      port: number;
    };
  };

  export type ServerEvent =
    | 'handshake'
    | 'handshake.error'
    | 'upload:page'
    | 'authenticate'
    | 'authenticate.error'
    | 'session:to:session'
    | 'broadcast:to:service';

  export type ClientEvent =
    | 'handshake'
    | 'handshake.error'
    | 'authenticate'
    | 'authenticate.error'
    | 'upload:page'
    | 'session:to:session'
    | 'broadcast:to:service';

  export type HandShakePayload = {
    serverTag: string;
    connectionId: string;
    services: string[];
  };

  export type HandshakeErrorPayload = {
    code: string;
    message: string;
  };

  export type SessionToSessionPayload<T = any> = {
    service: string;
    domain: string;
    event: string;
    payload: T & {
      sessionId: string;
    };
  };

  export type EventStructure<E extends ServerEvent> = {
    event: E;
    payload: EventPayload<E>;
  };

  export type AuthenticatePayload = {
    status: 'OK';
    authWebsocketId: string;
  };

  export type AuthenticateErrorPayload = {
    code: string;
    message: string;
  };

  export type UploadPagePayload = {
    connectionId: string;
  };

  export type EventPayload<E extends ClientEvent> = E extends 'handshake'
    ? HandShakePayload
    : E extends 'handshake.error'
      ? HandshakeErrorPayload
      : E extends 'authenticate'
        ? AuthenticatePayload
        : E extends 'authenticate.error'
          ? AuthenticateErrorPayload
          : E extends 'session:to:session'
            ? SessionToSessionPayload
            : E extends 'broadcast:to:service'
              ? string
              : E extends 'upload:page'
                ? UploadPagePayload
                : never;

  export type EventHandler<E extends ClientEvent> = (
    socket: WebSocket,
    payload: EventPayload<E>
  ) => Promise<void>;

  export type Events<E extends ClientEvent = ClientEvent> = {
    [key in E]: EventHandler<key>;
  };
}
