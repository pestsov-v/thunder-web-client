export type * from './services';

export interface IInitiator {
  start(): void;
  stop(): void;
}
