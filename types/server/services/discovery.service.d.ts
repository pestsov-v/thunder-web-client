import { IAbstractService } from './abstract.service';

export interface IDiscoveryService extends IAbstractService {
  readonly serverTag: string;

  getMandatory<T>(name: string): T;
  getString(name: string, def: string): string;
  getNumber(name: string, def: number): number;
  getBoolean(name: string, def: boolean): boolean;
  getArray<T>(name: string, def: Array<T>): Array<T>;
  getCertificateBuffer(path: string): Promise<Buffer>;
  getCertificateString(path: string): Promise<string>;
}

export namespace NDiscoveryService {}
