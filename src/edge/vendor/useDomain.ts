import { useEffect, useState } from 'react';
import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { ISchemaService, NSchemaService } from '@Edge/Types';

export const useDomain = (name: string): NSchemaService.Domain | undefined => {
  const [domain, setDomain] = useState<NSchemaService.Domain>();

  useEffect(() => {
    const loader = container.get<ISchemaService>(EdgeSymbols.SchemaService);
    const domain = loader.schema.get(name);
    setDomain(domain);
  }, [name]);

  return domain;
};
