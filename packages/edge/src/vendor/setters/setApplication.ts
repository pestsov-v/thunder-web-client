import { MetadataKeys } from '../../common';
import { FC } from 'react';
import type { AnyObject, StrSym, ISchemaLoader } from '@Edge/Types';

export const setApplication = <NF extends AnyObject = AnyObject, SE extends AnyObject = AnyObject>(
  structures: StrSym[],
  root?: {
    collector?: StrSym;
    errors?: {
      notFound404?: FC<NF>;
      serverError500?: FC<SE>;
    };
  }
): void => {
  const edgeSchemaLoader: ISchemaLoader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect);
  const edgeDefine = edgeSchemaLoader && edgeSchemaLoader.isDefine;
};
