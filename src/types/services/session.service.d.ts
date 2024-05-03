import type { IAbstractService } from './abstract.service';

export interface ISessionService extends IAbstractService {
  getSession(sessionId: string): any;
}

export namespace NSessionService {
  export type OrganizationIdentifiers = {
    sessionId: string;
    organizationId: string;
  };

  export type SessionIdentifiers = {
    sessionId: string;
    userId: string;
  };

  export type ErrorType = 'EXCEPTION' | 'ERROR' | 'VALIDATION';

  export type Config = {
    enable: boolean;
    connect: {
      protocol: 'ws' | 'wss';
      host: string;
      port: number;
    };
  };

  export type ClientEvent =
    | 'handshake'
    | 'handshake.error'
    | 'authenticate'
    | 'authenticate.error'
    | 'upload:page'
    | 'session:to:session'
    | 'session:to:session.error'
    | 'broadcast:to:service'
    | 'broadcast:to:service.error';

  export type HandShakePayload = {
    serverTag: string;
    connectionId: string;
    services: string[];
  };

  export type HandshakeErrorPayload = {
    code: string;
    message: string;
  };

  export type SessionToSessionPayload = {
    sessionId: string;
  };

  export type SessionToSessionErrorPayload = {
    type: ErrorType;
    code: string;
    message: string;
  };

  export type EventStructure<E extends ServerEvent> = {
    service: string;
    domain: string;
    event: string;
    type: E;
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
            : E extends 'session:to:session.error'
              ? SessionToSessionErrorPayload
              : E extends 'broadcast:to:service'
                ? string
                : E extends 'upload:page'
                  ? UploadPagePayload
                  : never;
}
