import { injectable, AbstractDiscoveryService } from '@Server/Package';
import { AbstractService } from './abstract.service';

import type { IDiscoveryService } from '@Server/Types';
import type { IAbstractDiscoveryService } from '@chaminjector/seeds-discovery-service';

@injectable()
export class DiscoveryService extends AbstractService implements IDiscoveryService {
  protected readonly _SERVICE_NAME = DiscoveryService.name;
  protected readonly _discoveryService = this;
  protected readonly _loggerService = undefined;
  private _abstractDiscoveryService: IAbstractDiscoveryService | undefined;
  protected async init(): Promise<boolean> {
    this._abstractDiscoveryService = new AbstractDiscoveryService();
    this._abstractDiscoveryService.setConfigSlice('visualizer');

    try {
      await this._abstractDiscoveryService.init();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  protected async destroy(): Promise<void> {
    this._abstractDiscoveryService = undefined;
  }

  private get _absDiscoveryService(): IAbstractDiscoveryService {
    if (!this._abstractDiscoveryService) {
      throw new Error('Abstract discovery service is not initialize.');
    }
    return this._abstractDiscoveryService;
  }

  public get serverTag(): string {
    return this._absDiscoveryService.serverTag;
  }

  public get nodeEnv(): string | 'production' {
    return this._absDiscoveryService.nodeEnv;
  }

  public getMandatory<T>(name: string): T {
    return this._absDiscoveryService.getMandatory(name);
  }

  public getString(name: string, def: string): string {
    return this._absDiscoveryService.getString(name, def);
  }

  public getNumber(name: string, def: number): number {
    return this._absDiscoveryService.getNumber(name, def);
  }

  public getBoolean(name: string, def: boolean): boolean {
    return this._absDiscoveryService.getBoolean(name, def);
  }

  public getArray<T>(name: string, def: Array<T>): Array<T> {
    return this._absDiscoveryService.getArray(name, def);
  }

  public async getCertificateBuffer(path: string): Promise<Buffer> {
    return this._absDiscoveryService.getCertificateBuffer(path);
  }

  public async getCertificateString(path: string): Promise<string> {
    return this._absDiscoveryService.getCertificateString(path);
  }
}
