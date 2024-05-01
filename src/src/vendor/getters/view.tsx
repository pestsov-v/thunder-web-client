import { ReactElement } from 'react';
import { CoreSymbols } from '~symbols';
import { container } from '~container';

import type {
  IFunctionalityAgent,
  ISchemaAgent,
  ISchemaService,
  IStoreService,
  NSchemaAgent,
  NSchemaService,
} from '~types';

export type ViewProps<
  S extends string = string,
  D extends string = string,
  V extends string = string,
  P = never,
> = {
  service: S;
  domain: D;
  view: V;
  props?: P;
};

export const View = <
  S extends string = string,
  D extends string = string,
  V extends string = string,
  P = never,
>(
  viewProps: ViewProps<S, D, V, P>
): ReactElement => {
  const { service, domain, props, view } = viewProps;

  const services = container.get<ISchemaService>(CoreSymbols.SchemaService).services;
  const rootStore = container.get<IStoreService>(CoreSymbols.StoreService).rootStore;

  const dStorage = services.get(service);
  if (!dStorage) {
    throw new Error(`Service "${service}" not found.`);
  }

  const vStorage = dStorage.get(domain);
  if (!vStorage) {
    throw new Error(`Domain storage "${domain}" not found in service "${service}".`);
  }

  const el = vStorage.views.get(view);

  if (!el) {
    throw new Error(
      `View function not found in domain storage "${domain}" in service "${service}". `
    );
  }

  const agents: NSchemaService.Agents = {
    fnAgent: container.get<IFunctionalityAgent>(CoreSymbols.FunctionalityAgent),
    schemaAgent: container.get<ISchemaAgent>(CoreSymbols.SchemaAgent),
  };

  const context: NSchemaAgent.ViewContext = {
    rootStore: rootStore,
  };

  return props ? el(agents, context, props) : el(agents, context);
};
