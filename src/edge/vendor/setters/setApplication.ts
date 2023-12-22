import { MetadataKeys } from '@Edge/Common';

import type { StrSym } from '@Utility/Types';
import type { ISchemaLoader } from '@Edge/Types';

export const setApplication = (structures: StrSym[]): void => {
  const edgeSchemaLoader: ISchemaLoader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect);
  const edgeDefine = edgeSchemaLoader && edgeSchemaLoader.isDefine;

  structures.forEach((structure) => {});
};
