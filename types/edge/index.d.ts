export type * from './factories';
export type * from './strategies';
export type * from './ports';
export type * from './agents';
export type * from './loaders';
export type * from './services';

export interface IInitiator {
  start(): void;
  stop(): void;
}
