import { IAbstractService } from './abstract.service';

export interface IDiscoveryService extends IAbstractService {
  getString(name: string, def: string): string;
}

export namespace NDiscoveryService {}
