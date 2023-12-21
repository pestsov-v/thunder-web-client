import { injectable } from '@Edge/Package';

import type { HttpMethod } from '@Utility/Types';
import type { ISchemaLoader, NSchemaService } from '@Edge/Types';
import type {
  AliasViewStructure,
  AliasViewStructures,
  ControllerStructure,
  DictionaryStructure,
  RouterStructure,
  WsListenerStructure,
} from '@Vendor/Types';

@injectable()
export class SchemaLoader implements ISchemaLoader {
  private _SCHEMA: NSchemaService.Schema | undefined;

  public init(): void {
    this._SCHEMA = new Map<string, NSchemaService.Domain>();
  }

  public destroy(): void {
    this._SCHEMA = undefined;
  }

  public get isDefine(): boolean {
    return typeof this._SCHEMA !== 'undefined';
  }

  public get schema(): NSchemaService.Schema {
    if (!this._SCHEMA) {
      throw new Error('Schema collection not initialize.');
    }

    return this._SCHEMA;
  }

  public setDomain(name: string): void {
    const domain = this.schema.get(name);
    if (!domain) {
      this.schema.set(name, {
        routes: new Map<string, NSchemaService.Route>(),
        dictionaries: new Map<string, NSchemaService.Dictionary>(),
        views: new Map<string, NSchemaService.View<string>>(),
        controllers: new Map<string, NSchemaService.ControllerHandler<string>>(),
        wsListeners: new Map<string, NSchemaService.WsListener>(),
      });
    } else {
      throw new Error(`Domain with name "${name}" has been exists early`);
    }
  }

  public setRouter(domain: string, routes: RouterStructure<string>): void {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setRouter(domain, routes);
      return;
    }

    for (const path in routes) {
      const methods = routes[path];

      for (const method in methods) {
        const httpMethod = method as HttpMethod;
        const route = methods[httpMethod];
        if (route) {
          dStorage.routes.set(path + '{{' + method.toUpperCase() + '}}', {
            domain: route.domain,
            action: path,
            environment: route.environment,
            service: route.service,
            method: httpMethod,
            isPrivateUser: route.isPrivateUser,
            isPrivateOrganization: route.isPrivateOrganization,
          });
        }
      }
    }
  }

  public setDictionaries(
    domain: string,
    dictionaries:
      | DictionaryStructure<string, NSchemaService.Dictionary>
      | DictionaryStructure<string, NSchemaService.Dictionary>[]
  ): void {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setDictionaries(domain, dictionaries);
      return;
    }

    if (Array.isArray(dictionaries)) {
      dictionaries.forEach((dictionary) => {
        dStorage.dictionaries.set(dictionary.language, dictionary.dictionary);
      });
    } else {
      dStorage.dictionaries.set(dictionaries.language, dictionaries.dictionary);
    }
  }

  public setControllers(domain: string, controllers: ControllerStructure<string>) {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setControllers(domain, controllers);
      return;
    }

    for (const cName in controllers) {
      const controller = controllers[cName];
      const isExist = dStorage.controllers.get(cName);
      if (!isExist) {
        dStorage.controllers.set(cName, controller);
      } else {
        throw new Error(`Controller with "${cName}" has been exists.`);
      }
    }
  }

  public setWsListeners(domain: string, listeners: WsListenerStructure<string>) {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setWsListeners(domain, listeners);
      return;
    }

    for (const lName in listeners) {
      const listener = listeners[lName];
      const isExist = dStorage.controllers.get(lName);
      if (!isExist) {
        dStorage.wsListeners.set(lName, listener);
      } else {
        throw new Error(`Websocket listener with "${lName}" has been exists.`);
      }
    }
  }

  public setViews(domain: string, views: AliasViewStructure | AliasViewStructures): void {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setViews(domain, views);
      return;
    }

    if (Array.isArray(views)) {
      views.forEach((view) => {
        dStorage.views.set(view.name, view.View);
      });
    } else {
      dStorage.views.set(views.name, views.View);
    }
  }
}
