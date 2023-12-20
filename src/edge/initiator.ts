import { injectable } from '@Edge/Package';

import type { IInitiator } from '@Edge/Types';

@injectable()
export class Initiator implements IInitiator {
  public start(): void {
    console.log('start');
  }

  public stop(): void {
    console.log('stop');
  }
}
