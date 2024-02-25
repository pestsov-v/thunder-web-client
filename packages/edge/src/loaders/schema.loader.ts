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
  private _DOMAINS: NSchemaService.Domains | undefined;
  private _services: NSchemaService.Services | undefined;

  public init(): void {
    this._DOMAINS = new Map<string, NSchemaService.Domain>();
    this._services = new Map<string, NSchemaService.Domains>();
  }

  public destroy(): void {
    this._DOMAINS = undefined;
    this._services = undefined;
  }

  public get isDefine(): boolean {
    return typeof this._DOMAINS !== 'undefined';
  }

  public get services(): NSchemaService.Services {
    if (!this._services) {
      throw new Error('Schema collection not initialize.');
    }

    return this._services;
  }

  private get _domains(): NSchemaService.Domains {
    if (!this._DOMAINS) {
      throw new Error('Domains collection not initialize');
    }

    return this._DOMAINS;
  }

  public setDomain(name: string): void {
    const domain = this.services.get(name);
    if (!domain) {
      this._domains.set(name, {
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

  public applyDomainToService(service: string, domain: string): void {
    const sStorage = this.services.get(service);
    if (!sStorage) {
      this.services.set(service, new Map<string, NSchemaService.Domain>());
      this.applyDomainToService(service, domain);
      return;
    }

    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      throw new Error(`Domain ${domain} not found`);
    }

    sStorage.set(domain, dStorage);
  }

  public setRouter(domain: string, routes: RouterStructure<string>): void {
    const dStorage = this._domains.get(domain);
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
    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      this.setDomain(domain);
      this.setDictionaries(domain, dictionaries);
      return;
    }

    dStorage.dictionaries.set(dictionaries.language, dictionaries.dictionary);
  }

  public setControllers(domain: string, controllers: ControllerStructure): void {
    const dStorage = this._domains.get(domain);
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
    const dStorage = this._domains.get(domain);
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
    const dStorage = this._domains.get(domain);
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
    const dStorage = this._domains.get(domain);
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
