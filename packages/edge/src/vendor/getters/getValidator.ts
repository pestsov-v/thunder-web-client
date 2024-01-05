import { EdgeSymbols } from '@Edge/Symbols';
import { container } from '@Edge/Container';

import type { Zod, ISchemaService } from '@Edge/Types';

export const getValidator = <V extends string = string, D extends string = string>(
  schema: V,
  domain: D,
  type: 'in' | 'out'
): Zod.ZodObject<Zod.ZodRawShape> => {
  const loader = container.get<ISchemaService>(EdgeSymbols.SchemaService);
  const dStorage = loader.schema.get(domain);
  if (!dStorage) {
    throw new Error(`Domain storage "${domain}" not found.`);
  }

  const validateObg = dStorage.validators.get(schema);
  if (!validateObg) {
    throw new Error(`Validator handler "${schema}" not found.`);
  }

  switch (type) {
    case 'in':
      return validateObg.inSchema();
    case 'out':
      return validateObg.outSchema();
  }
};
