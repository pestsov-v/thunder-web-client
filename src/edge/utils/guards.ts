import { NGetawayService, NSessionService } from '@Edge/Types';

export class Guards {
  static isEventStructure = (
    x: NSessionService.EventStructure | unknown
  ): x is NSessionService.EventStructure => {
    return typeof x === 'object' && x !== null && 'event' in x && 'payload' in x;
  };

  static isServerResponse = (
    x: NGetawayService.ServerResponse | unknown
  ): x is NGetawayService.ServerResponse => {
    return typeof x === 'object' && x !== null && 'type' in x && 'format' in x;
  };
}
