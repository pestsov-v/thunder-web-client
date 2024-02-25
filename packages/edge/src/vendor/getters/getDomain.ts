import { useEffect, useState } from 'react';
import { container } from '@Edge/Container';
import { EdgeSymbols } from '@Edge/Symbols';

import type { ISchemaService, NSchemaService } from '@Edge/Types';

export const GetDomain = (service: string, name: string): NSchemaService.Domain | undefined => {
  const [domain, setDomain] = useState<NSchemaService.Domain>();

  useEffect(() => {
    const services = container.get<ISchemaService>(EdgeSymbols.SchemaService).services;
    const sStorage = services.get(service);
    if (sStorage) {
      const dStorage = sStorage.get(name);
      setDomain(dStorage);
    }
  }, [service, name]);

  return domain;
};
