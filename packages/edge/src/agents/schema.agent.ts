import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { container } from '@Edge/Container';
import { Helpers } from '../utils';

import type { FC } from 'react';
import type {
  ExtendedRecordObject,
  HttpMethod,
  IFunctionalityAgent,
  ILocalizationService,
  ISchemaAgent,
  ISchemaService,
  KeyStringLiteralBuilder,
  NSchemaService,
} from '@Edge/Types';

@injectable()
export class SchemaAgent implements ISchemaAgent {
  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.LocalizationService)
    private readonly _localizationService: ILocalizationService
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

    return vStorage(agents, props);
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

    let context: NSchemaService.RouteContext<NSchemaService.AuthScope>;

    switch (rStorage.scope) {
      case 'public:route':
        context = { l1: 1 };
        break;
      case 'private:user':
        context = { l2: '' };
        break;
      case 'private:organization':
        context = { l3: true };
        break;
      default:
        throw Helpers.switchCaseChecker(rStorage.scope);
    }

    return rStorage.handler(agents, context, payload) as E;
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
}
