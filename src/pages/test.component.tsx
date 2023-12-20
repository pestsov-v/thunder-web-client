import { useEffect, useState } from 'react';
import { container } from '@EdgeContainer';
import { ISchemaService, NSchemaService } from '@Edge/Types';
import { EdgeSymbols } from '@EdgeSymbols';

export const useDomain = (name: string) => {
  const [domain, setDomain] = useState<NSchemaService.Domain>();

  useEffect(() => {
    const loader = container.get<ISchemaService>(EdgeSymbols.SchemaLoader);
    const domain = loader.schema.get(name);
    setDomain(domain);
  }, [name]);

  return { domain };
};

const TextComponent = () => {
  const { domain } = useDomain('SysUsers');

  return <div>${JSON.stringify(domain)}</div>;
};

export default TextComponent;
