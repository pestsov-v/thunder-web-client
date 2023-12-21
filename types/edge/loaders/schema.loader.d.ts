import type { NSchemaService } from '../services';
import type {
  AliasDictionaryStructure,
  AliasDictionaryStructures,
  AliasViewStructure,
  ControllerStructure,
  RouterStructure,
  WsListenerStructure,
} from '@Vendor/Types';
import { AliasViewStructures } from '@Vendor/Types';

export interface ISchemaLoader {
  readonly isDefine: boolean;
  readonly schema: NSchemaService.Schema;

  init(): void;
  destroy(): void;
  setDomain(name: string): void;
  setRouter(domain: string, routes: RouterStructure<string>): void;
  setDictionaries(
    domain: string,
    dictionaries: AliasDictionaryStructure | AliasDictionaryStructures
  ): void;
  setViews(domain: string, views: AliasViewStructure | AliasViewStructures): void;
  setControllers(domain: string, controllers: ControllerStructure<string>): void;
  setWsListeners(domain: string, listeners: WsListenerStructure<string>): void;
}
