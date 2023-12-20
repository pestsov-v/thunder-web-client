import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { Nullable } from '@Utility/Types';
import type { IFunctionalityAgent, ISchemaService } from '@Edge/Types';

export const UseController = async <T, R = void>(
  domain: string,
  controller: string,
  data?: T
): Promise<Nullable<T>> => {
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
      return result;
    }
  }
};
