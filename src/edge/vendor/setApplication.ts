import { ISchemaLoader } from '@Edge/Types';
import { MetadataKeys } from '@Edge/Common';
import { CollectorStructure } from '@Vendor/Types';

export const setApplication = (structures: CollectorStructure[]): void => {
  const edgeSchemaLoader: ISchemaLoader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect);
  const edgeDefine = edgeSchemaLoader && edgeSchemaLoader.isDefine;

  structures.forEach((structure) => {
    if (edgeDefine) {
      edgeSchemaLoader.setDomain(structure.domain);
      const { documents } = structure;

      if (documents.router) {
        edgeSchemaLoader.setRouter(structure.domain, documents.router);
      }
    }
  });
};