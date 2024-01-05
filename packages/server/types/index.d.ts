export type * from './services';
export type * from './packages/packages';

export interface IInitiator {
  start(): Promise<void>;
  stop(): Promise<void>;
}
