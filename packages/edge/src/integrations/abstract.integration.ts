import { injectable } from '@Edge/Package';

import type { IAbstractIntegration } from '@Edge/Types';

@injectable()
export abstract class AbstractIntegration implements IAbstractIntegration {
  protected abstract _INTEGRATION_NAME: string;
  protected abstract init(): boolean;
  protected abstract destroy(): void;

  public start() {
    this.init();

    console.log(`integration ${this._INTEGRATION_NAME} has been initialize.`);
  }

  public stop() {
    this.destroy();
  }
}
