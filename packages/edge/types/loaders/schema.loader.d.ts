import type { NSchemaService } from '../services';
import {
  ControllerStructure,
  DictionaryStructure,
  RouterStructure,
  StoreStructure,
  ViewStructure,
  WsListenerStructure,
} from '../setters';
import { AnyObject } from '../../common';

export interface ISchemaLoader {
  readonly isDefine: boolean;
  readonly schema: NSchemaService.Schema;

  init(): void;
  destroy(): void;
  setDomain(name: string): void;
  setRouter(domain: string, routes: RouterStructure<string>): void;
  setDictionaries(domain: string, dictionaries: DictionaryStructure): void;
  setViews(domain: string, views: ViewStructure): void;
  setStore(domain: string, store: StoreStructure<string, AnyObject, AnyObject>): void;
  setControllers(domain: string, controllers: ControllerStructure): void;
  setWsListeners(domain: string, listeners: WsListenerStructure): void;
}
