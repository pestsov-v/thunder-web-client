export interface IStorageStrategy {
  readonly length: number;

  setItem(key: string, value: unknown): void;
  getMandatory<T>(name: string): T | string;
  getString(key: string, def: string): string;
  getNumber(key: string, def: number): number;
  getBoolean(name: string, def: boolean): boolean;
  getObject<T>(name: string, def: T): T;
  getArray<T>(name: string, def: Array<T>): Array<T>;
  removeItem(key: string): void;
  clear(): void;
}
