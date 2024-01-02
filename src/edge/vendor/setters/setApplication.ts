import { MetadataKeys } from '@Edge/Common';

import type { AnyObject, StrSym } from '@Utility/Types';
import type { ISchemaLoader } from '@Edge/Types';
import { FC } from 'react';

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
