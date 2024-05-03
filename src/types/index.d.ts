import { Controller, RouterAdvanced } from './services/schema.service';

export type * from './factories';
export type * from './strategies';
export type * from './integrations';
export type * from './providers';
export type * from './agents';
export type * from './loaders';
export type * from './services';
export type * from '../common';
export type * from './packages/packages';
export type * from './setters';
export type * from './utility';
export type * from './adapters';

export interface IInitiator {
  start(): void;
  stop(): void;
}

export type Service<D extends string> = {
  [key in D]: {
    router?: string | Record<string, Controller> | RouterAdvanced;
    views?: string;
    dictionary?: {
      languages?: string;
    };
  };
};
