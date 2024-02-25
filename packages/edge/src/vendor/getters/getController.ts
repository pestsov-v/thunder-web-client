import { container } from '@Edge/Container';
import { EdgeSymbols } from '@Edge/Symbols';

import type { Nullable, IFunctionalityAgent, ISchemaService } from '@Edge/Types';

export const getController = async <
  S extends string = string,
  D extends string = string,
  C extends string = string,
  T = undefined,
  R = void,
>(
  service: S,
  domain: D,
  controller: C,
  data?: T
): Promise<Nullable<R>> => {
  const schema = container.get<ISchemaService>(EdgeSymbols.SchemaService).services;
  const sStorage = schema.get(service);
  if (sStorage) {
    const dStorage = sStorage.get(domain);
    if (dStorage) {
      const handler = dStorage.controllers.get(controller);
      if (handler) {
        const result = await handler(
          {
            fnAgent: container.get<IFunctionalityAgent>(EdgeSymbols.FunctionalityAgent),
          },
          {
            body: data,
          }
        );
        return result ?? null;
      } else {
        return null;
      }
    }
  }
  return null;
};
