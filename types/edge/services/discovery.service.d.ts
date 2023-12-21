import { IAbstractService } from '@Edge/Types';

export interface IDiscoveryService extends IAbstractService {
  setVariables(): void;
}

export namespace NDiscoveryService {}
