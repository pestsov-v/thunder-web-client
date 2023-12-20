import { IAbstractService } from './abstract.service';

export interface ISessionService extends IAbstractService {
  readonly one: boolean;
}

export namespace NSessionService {
  export type ServerEventType = 'server:handshake';

  export type ClientEventType =
    | 'client:session:to:session'
    | 'client:broadcast:to:app'
    | 'client:broadcast:to:room';

  export type SchemaEventStructure<E extends string, P = undefined> = {
    event: E;
    payload?: P;
  };

  export type EventStructure<E, P> = {
    event: ClientEventType;
    payload: SchemaEventStructure<E, P>;
  };
}
