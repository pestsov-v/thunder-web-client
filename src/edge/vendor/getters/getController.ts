import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { Nullable } from '@Utility/Types';
import type { IFunctionalityAgent, ISchemaService } from '@Edge/Types';

export const getController = async <
  D extends string = string,
  C extends string = string,
  T = undefined,
  R = void,
>(
  domain: D,
  controller: C,
  data?: T
): Promise<Nullable<R>> => {
  const schema = container.get<ISchemaService>(EdgeSymbols.SchemaService).schema;
  const dStorage = schema.get(domain);
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
  return null;
};
