import { NSessionService } from '@Edge/Types';

export class Guards {
  public static isEventStructure = (x: unknown): x is NSessionService.EventStructure<any> => {
    return typeof x === 'object' && x !== null && 'event' in x && 'payload' in x;
  };

  public static isCorrectEvent = (x: unknown): x is NSessionService.ClientEvent => {
    return (
      x === 'handshake' ||
      x === 'handshake.error' ||
      x === 'authenticate' ||
      x === 'session:to:session' ||
      x === 'broadcast:to:service'
    );
  };

  public static isSessionToSessionEvent = (
    x: unknown
  ): x is NSessionService.SessionToSessionPayload => {
    return typeof x === 'object' && x !== null && 'sessionId' in x;
  };
}
