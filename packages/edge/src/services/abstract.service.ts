import { injectable } from '@Edge/Package';
import { IAbstractService } from '@Edge/Types';

@injectable()
export abstract class AbstractService implements IAbstractService {
  protected abstract _SERVICE_NAME: string;
  protected abstract init(): boolean;
  protected abstract destroy(): void;

  public start(): void {
    this.init();

    console.log(`Service ${this._SERVICE_NAME} has been started.`);
  }

  public stop(): void {
    this.destroy();
  }
}
