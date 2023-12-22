import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { Nullable } from '@Utility/Types';
import type { IFunctionalityAgent, ISchemaService } from '@Edge/Types';

export const getController = async <T, R>(
  domain: string,
  controller: string,
  data?: T
): Promise<Nullable<R>> => {
  const loader = container.get<ISchemaService>(EdgeSymbols.SchemaService);
  const dStorage = loader.schema.get(domain);
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
