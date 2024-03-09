import { ReactElement } from 'react';
import { EdgeSymbols } from '@Edge/Symbols';
import { container } from '@Edge/Container';
import {
  IFunctionalityAgent,
  ISchemaAgent,
  ISchemaService,
  IStoreService,
  NSchemaAgent,
  NSchemaService,
} from '@Edge/Types';

export type ViewProps<
  S extends string = string,
  D extends string = string,
  V extends string = string,
  P = any,
> = {
  service: S;
  domain: D;
  view: V;
  props: P;
};

export const View = ({ service, domain, view, props }: ViewProps): ReactElement => {
  const services = container.get<ISchemaService>(EdgeSymbols.SchemaService).services;
  const rootStore = container.get<IStoreService>(EdgeSymbols.StoreService).rootStore;

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
    fnAgent: container.get<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent),
    schemaAgent: container.get<ISchemaAgent>(EdgeSymbols.SchemaAgent),
  };

  const context: NSchemaAgent.ViewContext = {
    rootStore: rootStore,
  };

  return el(agents, context, props);
};
