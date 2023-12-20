export type * from './agents';
export type * from './loaders';
export type * from './services';

export interface IInitiator {
  start(): void;
  stop(): void;
}
