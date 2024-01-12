import { MetadataKeys } from '../../common';
import { FC } from 'react';
import type { AnyObject, ISchemaLoader } from '@Edge/Types';

export const setService = <NF extends AnyObject = AnyObject, SE extends AnyObject = AnyObject>(
  name: string,
  domains: string[],
  root?: {
    collector?: string;
    errors?: {
      notFound404?: FC<NF>;
      serverError500?: FC<SE>;
    };
  }
): string => {
  const edgeSchemaLoader: ISchemaLoader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect);
  const edgeDefine = edgeSchemaLoader && edgeSchemaLoader.isDefine;

  return name;
};
