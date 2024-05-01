import { injectable } from '~package';

import type {
  AnyObject,
  DictionaryStructure,
  ISchemaLoader,
  NSchemaService,
  ServiceStructure,
  StoreStructure,
  ViewStructure,
} from '~types';

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

  public setBusinessLogic(services: ServiceStructure[]): void {
    services.forEach((service) => {
      service.domains.forEach((domain) => {
        const name = domain.domain;
        const { documents } = domain;

        this._setDomain(name);
        if (documents.router) {
          this._setRouter(name, documents.router);
        }
        if (documents.views) {
          if (Array.isArray(documents.views)) {
            documents.views.forEach((v) => this._setView(name, v));
          } else {
            this._setView(name, documents.views);
          }
        }
        if (documents.dictionaries) {
          if (Array.isArray(documents.dictionaries)) {
            documents.dictionaries.forEach((v) => this._setDictionary(name, v));
          } else {
            this._setDictionary(name, documents.dictionaries);
          }
        }

        if (documents.store) {
          this._setStore(name, documents.store);
        }

        if (documents.emitter) {
          this._setEmitter(name, documents.emitter);
        }

        this._applyDomainToService(service.service, domain.domain);
      });
    });
  }

  private get _domains(): NSchemaService.Domains {
    if (!this._DOMAINS) {
      throw new Error('Domains collection not initialize');
    }

    return this._DOMAINS;
  }

  private _setDomain(name: string): void {
    const domain = this.services.get(name);
    if (!domain) {
      this._domains.set(name, {
        routes: new Map<string, NSchemaService.RouteStructure>(),
        dictionaries: new Map<string, NSchemaService.Dictionary>(),
        views: new Map<string, NSchemaService.View<string>>(),
        validators: new Map<string, NSchemaService.Validator>(),
        events: new Map<string, NSchemaService.EventStructure>(),
      });
    } else {
      throw new Error(`Domain with name "${name}" has been exists early`);
    }
  }

  private _applyDomainToService(service: string, domain: string): void {
    const sStorage = this.services.get(service);
    if (!sStorage) {
      this.services.set(service, new Map<string, NSchemaService.Domain>());
      this._applyDomainToService(service, domain);
      return;
    }

    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      throw new Error(`Domain ${domain} not found`);
    }

    sStorage.set(domain, dStorage);
  }

  private _setRouter(domain: string, routes: NSchemaService.Router<string>): void {
    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      this._setDomain(domain);
      this._setRouter(domain, routes);
      return;
    }

    for (const route in routes) {
      const endpoint = routes[route];

      for (const method in endpoint) {
        const controller = endpoint[method];

        if (controller) {
          const name = route + '{{' + method.toUpperCase() + '}}';
          if (dStorage.routes.has(name)) {
            throw new Error(
              `Route path "${endpoint}" with method "${method.toUpperCase()}" has been exists.`
            );
          } else {
            dStorage.routes.set(name, {
              route: route,
              method: method,
              scope: controller.scope,
              handler: controller.handler,
            });
          }
        }
      }
    }
  }

  private _setEmitter(domain: string, events: NSchemaService.Emitter<string>): void {
    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      this._setDomain(domain);
      this._setEmitter(domain, events);
      return;
    }

    for (const event in events) {
      const types = events[event];

      for (const type in types) {
        const listener = types[type as NSchemaService.EventType];

        if (listener) {
          const name = event + '{{' + type + '}}';
          if (dStorage.events.has(name)) {
            throw new Error(`Event name "${event}" with event type "${type}" has been exists.`);
          } else {
            dStorage.events.set(name, {
              event: event,
              type: type as NSchemaService.EventType,
              scope: listener.scope,
              handler: listener.handler,
            });
          }
        }
      }
    }
  }

  private _setDictionary(domain: string, dictionaries: DictionaryStructure): void {
    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      this._setDomain(domain);
      this._setDictionary(domain, dictionaries);
      return;
    }

    dStorage.dictionaries.set(dictionaries.language, dictionaries.dictionary);
  }

  private _setStore(domain: string, store: StoreStructure<AnyObject, AnyObject>): void {
    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      this._setDomain(domain);
      this._setStore(domain, store);
      return;
    }

    if (dStorage.store) {
      throw new Error(`Zustand store with has been exists.`);
    } else {
      dStorage.store = store;
    }
  }

  private _setView(domain: string, views: ViewStructure): void {
    const dStorage = this._domains.get(domain);
    if (!dStorage) {
      this._setDomain(domain);
      this._setView(domain, views);
      return;
    }
    const isExist = dStorage.views.get(views.name);
    if (!isExist) {
      dStorage.views.set(views.name, views.view);
    } else {
      throw new Error(`View with "${views.name}" has been exists.`);
    }
  }
}
