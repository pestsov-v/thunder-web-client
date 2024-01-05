import { injectable } from '@Edge/Package';

import type {
  AnyObject,
  ControllerStructure,
  DictionaryStructure,
  HttpMethod,
  ISchemaLoader,
  NSchemaService,
  RouterStructure,
  StoreStructure,
  ViewStructure,
  WsListenerStructure,
} from '@Edge/Types';

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
        store: new Map<string, NSchemaService.Store>(),
        validators: new Map<string, NSchemaService.Validator>(),
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

  public setDictionaries(domain: string, dictionaries: DictionaryStructure): void {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setDictionaries(domain, dictionaries);
      return;
    }

    dStorage.dictionaries.set(dictionaries.language, dictionaries.dictionary);
  }

  public setControllers(domain: string, controllers: ControllerStructure): void {
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

  public setWsListeners(domain: string, listeners: WsListenerStructure): void {
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

  public setStore(domain: string, stores: StoreStructure<string, AnyObject, AnyObject>): void {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setStore(domain, stores);
      return;
    }

    for (const sName in stores) {
      const store = stores[sName];
      if (!store) return;

      const isExist = dStorage.store.get(sName);
      if (!isExist) {
        dStorage.store.set(sName, store);
      } else {
        throw new Error(`Zustand store with "${sName}" has been exists.`);
      }
    }
  }

  public setViews(domain: string, views: ViewStructure): void {
    const dStorage = this.schema.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setViews(domain, views);
      return;
    }
    const isExist = dStorage.views.get(views.name);
    if (!isExist) {
      dStorage.views.set(views.name, views.View);
    } else {
      throw new Error(`View with "${views.name}" has been exists.`);
    }
  }
}
