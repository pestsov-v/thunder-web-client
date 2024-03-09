import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { container } from '@Edge/Container';
import { Helpers } from '../utils';

import type { FC } from 'react';
import type {
  ExtendedRecordObject,
  HttpMethod,
  IAuthService,
  IFunctionalityAgent,
  ILocalizationService,
  ISchemaAgent,
  ISchemaService,
  IStoreService,
  KeyStringLiteralBuilder,
  NSchemaAgent,
  NSchemaService,
} from '@Edge/Types';

@injectable()
export class SchemaAgent implements ISchemaAgent {
  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.LocalizationService)
    private readonly _localizationService: ILocalizationService,
    @inject(EdgeSymbols.StoreService)
    private readonly _storeService: IStoreService,
    @inject(EdgeSymbols.AuthService)
    private readonly _authService: IAuthService
  ) {}

  public getListener<
    S extends string = string,
    D extends string = string,
    E extends string = string,
  >(service: S, domain: D, event: E, scope: NSchemaService.AuthScope): void {
    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      throw new Error(`Service "${service}" not found.`);
    }

    const dStorage = sStorage.get(domain);
    if (!dStorage) {
      throw new Error(`Domain "${domain}" in service "${service}" not found.`);
    }

    const name = event + '{{' + scope + '}}';
    const eStorage = dStorage.events.get(name);

    if (!eStorage) {
      throw new Error(
        `Event "${event}" with event scope "${scope}" in domain "${domain}" in service "${service}" not found.`
      );
    }
  }

  public getView<
    S extends string = string,
    D extends string = string,
    V extends string = string,
    P = undefined,
  >(service: S, domain: D, view: V, props?: P): FC<P> {
    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      throw new Error(`Service "${service}" not found.`);
    }

    const dStorage = sStorage.get(domain);
    if (!dStorage) {
      throw new Error(`Domain "${domain}" in service "${service}" not found.`);
    }

    const vStorage = dStorage.views.get(view);

    if (!vStorage) {
      throw new Error(`View "${view}" in domain "${domain}" in service "${service}" not found.`);
    }

    const agents: NSchemaService.Agents = {
      fnAgent: container.get<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent),
      schemaAgent: container.get<ISchemaAgent>(EdgeSymbols.SchemaAgent),
    };

    const content: NSchemaAgent.ViewContext = {
      rootStore: this._storeService.rootStore,
    };

    return vStorage(agents, content, props);
  }

  public getRoute<
    S extends string = string,
    D extends string = string,
    R extends string | keyof Record<string, NSchemaService.Controller> =
      | string
      | keyof Record<string, NSchemaService.Controller>,
    P = any,
    E = any,
  >(service: S, domain: D, route: R, method: HttpMethod, payload?: P): E {
    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      throw new Error(`Service "${service}" not found.`);
    }

    const dStorage = sStorage.get(domain);
    if (!dStorage) {
      throw new Error(`Domain "${domain}" in service "${service}" not found.`);
    }

    const rStorage = dStorage.routes.get(route + '{{' + method.toUpperCase() + '}}');

    if (!rStorage) {
      throw new Error(
        `Route "${route}" with method "${method}" in domain "${domain}" in service "${service}" not found.`
      );
    }

    const agents: NSchemaService.Agents = {
      fnAgent: container.get<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent),
      schemaAgent: container.get<ISchemaAgent>(EdgeSymbols.SchemaAgent),
    };

    const context = this._getContext(rStorage.scope) as NSchemaService.RouteContext<
      any,
      any,
      'private:organization'
    >;
    return rStorage.handler(agents, context, payload) as E;
  }

  private _getContext(
    scope: NSchemaService.AuthScope
  ): NSchemaService.RouteContext<any, any, NSchemaService.AuthScope> {
    let context: NSchemaService.RouteContext<any, any, NSchemaService.AuthScope> = {
      rootStore: this._storeService.rootStore,
    };

    switch (scope) {
      case 'public:route':
        break;
      case 'private:user':
        context = {
          ...context,
          user: this._authService.getUserJWTPayload().payload,
        };
        break;
      case 'private:organization':
        context = {
          ...context,
          user: this._authService.getUserJWTPayload().payload,
          organization: this._authService.getOrgJWTPayload().payload,
        };
        break;
      default:
        throw Helpers.switchCaseChecker(scope);
    }

    return context;
  }

  public getDictionary<
    S extends string = string,
    DOM extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
    L extends string = string,
  >(service: S, domain: DOM, language: L): DICT {
    return this._localizationService.getDictionary<S, DOM, L, DICT>(service, domain, language);
  }

  public getDefaultLnResource<
    S extends string = string,
    DOM extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
    SUBS extends Record<string, string> = Record<string, string>,
  >(
    service: S,
    domain: DOM,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: SUBS
  ): string {
    return this._localizationService.getDefaultLnResource<S, DOM, DICT, SUBS>(
      service,
      domain,
      resource,
      substitutions
    );
  }

  public getResource<
    S extends string = string,
    DOM extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
    SUBS extends Record<string, string> = Record<string, string>,
    L extends string = string,
  >(
    service: S,
    domain: DOM,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: SUBS,
    language?: L
  ): string {
    return this._localizationService.getResource<S, DOM, DICT, SUBS, L>(
      service,
      domain,
      resource,
      substitutions,
      language
    );
  }

  public getStore<SER extends string = string, D extends string = string, STO = any>(
    service: SER,
    domain: D
  ): () => STO {
    return this._storeService.getStore<STO>(service, domain);
  }
}
