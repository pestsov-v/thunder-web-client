import { IStoreService, NSchemaService } from '../services';
import { ExtendedRecordObject, type HttpMethod, KeyStringLiteralBuilder } from '../utility';

import type { FC } from 'react';

export interface ISchemaAgent {
  readonly services: NSchemaService.Services;

  getServiceDomains<S extends string = string>(service: S): NSchemaService.Domains;
  getDomainsDocuments<S extends string = string, D extends string = string>(
    service: S,
    domain: D
  ): NSchemaService.Domain;
  getListener<S extends string = string, D extends string = string, E extends string = string>(
    service: S,
    domain: D,
    event: E,
    scope: NSchemaService.AuthScope
  ): void;
  getView<
    S extends string = string,
    D extends string = string,
    V extends string = string,
    P = undefined,
  >(
    service: S,
    domain: D,
    view: V,
    props?: P
  ): FC<P>;
  getRoute<
    S extends string = string,
    D extends string = string,
    R extends string = string,
    P = any,
    E = any,
  >(
    service: S,
    domain: D,
    route: R,
    method: HttpMethod,
    payload?: P
  ): E;
  getDictionary<
    S extends string = string,
    DOM extends string = string,
    L extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
  >(
    service: S,
    domain: DOM,
    language: L
  ): DICT;
  getDefaultLnResource<
    S extends string = string,
    DOM extends string = string,
    SUBS extends Record<string, string> = Record<string, string>,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
  >(
    service: S,
    domain: DOM,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: SUBS
  ): string;
  getResource<
    S extends string = string,
    DOM extends string = string,
    L extends string = string,
    SUBS extends Record<string, string> = Record<string, string>,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
  >(
    service: S,
    domain: DOM,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: SUBS,
    language?: L
  ): string;
  getStore<SER extends string = string, D extends string = string, STO = any>(
    service: SER,
    domain: D
  ): () => STO;
}

export namespace NSchemaAgent {
  export type ViewContext = {
    rootStore: IStoreService['rootStore'];
  };
}
