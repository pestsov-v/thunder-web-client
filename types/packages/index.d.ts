import type joi from 'joi';
import events from 'eventemitter3';

export * from './packages';

export namespace Joi {
  export type Root = joi.Root;
}

export namespace Events {
  export type EventEmitter = events.EventEmitter;
}
