import { NSessionService } from '@Edge/Types';

export class Guards {
  static isEventStructure = (
    x: NSessionService.EventStructure | unknown
  ): x is NSessionService.EventStructure => {
    return typeof x === 'object' && x !== null && 'event' in x && 'payload' in x;
  };
}
