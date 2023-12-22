import type { IAbstractService } from '@Server/Types';

export interface INextService extends IAbstractService {
  run(): Promise<void>;
}

export namespace NNextService {
  export type Config = {
    protocol: string;
    host: string;
    port: number;
  };
}
