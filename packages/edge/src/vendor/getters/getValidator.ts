import { EdgeSymbols } from '@Edge/Symbols';
import { container } from '@Edge/Container';

import type { Zod, ISchemaService } from '@Edge/Types';

export const getValidator = <
  V extends string = string,
  S extends string = string,
  D extends string = string,
>(
  schema: V,
  service: S,
  domain: D,
  type: 'in' | 'out'
): Zod.ZodObject<Zod.ZodRawShape> => {
  const services = container.get<ISchemaService>(EdgeSymbols.SchemaService).services;
  const sStorage = services.get(service);
  if (!sStorage) {
    throw new Error(`Service storage "${service}" not found.`);
  }

  const dStorage = sStorage.get(domain);

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
