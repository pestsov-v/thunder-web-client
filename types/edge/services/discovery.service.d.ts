import { IAbstractService } from '@Edge/Types';

export interface IDiscoveryService extends IAbstractService {
  getMandatory<T>(name: string): T;
  getString(name: string, def: string): string;
  getNumber(name: string, def: number): number;
  getBoolean(name: string, def: boolean): boolean;
  getArray<T>(name: string, def: Array<T>): Array<T>;
}

export namespace NDiscoveryService {
  export type EnvsConfig = Record<string, unknown>;
}
