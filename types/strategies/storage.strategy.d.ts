import { KeyConfigLiteralBuilder } from '../utility';

export interface IStorageStrategy {
  readonly length: number;

  setItem<T>(key: KeyConfigLiteralBuilder<NStorageStrategy.StorageConfig, T>, value: unknown): void;
  getMandatory<T>(name: KeyConfigLiteralBuilder<NStorageStrategy.StorageConfig, T>): T | string;
  getString(
    key: KeyConfigLiteralBuilder<NStorageStrategy.StorageConfig, string>,
    def: string
  ): string;
  getNumber(
    key: KeyConfigLiteralBuilder<NStorageStrategy.StorageConfig, number>,
    def: number
  ): number;
  getBoolean(
    name: KeyConfigLiteralBuilder<NStorageStrategy.StorageConfig, boolean>,
    def: boolean
  ): boolean;
  getObject<T>(name: string, def: T): T;
  getArray<T>(name: string, def: Array<T>): Array<T>;
  removeItem(key: KeyConfigLiteralBuilder<NStorageStrategy.StorageConfig, string>): void;
  clear(): void;
}

export namespace NStorageStrategy {
  export type StorageConfig = {
    'websocket-connection-id': string;
    'websocket-auth-connection-id': string;
    'session-id': string;
    'x-user-access-token': string;
    'x-user-refresh-token': string;
    'x-organization-access-token': string;
    'x-organization-refresh-token': string;
  };
}
