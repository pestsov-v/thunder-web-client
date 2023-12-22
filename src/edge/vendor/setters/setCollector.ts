import { MetadataKeys } from '@Edge/Common';

import type { ISchemaLoader } from '@Edge/Types';
import type { CollectionStructure } from '@Setters/Types';
import { StrSym } from '@Utility/Types';

export const setCollector = (structure: CollectionStructure): StrSym => {
  const edgeSchemaLoader: ISchemaLoader = Reflect.getMetadata(MetadataKeys.SchemaLoader, Reflect);
  const edgeDefine = edgeSchemaLoader && edgeSchemaLoader.isDefine;

  if (edgeDefine) {
    edgeSchemaLoader.setDomain(structure.domain);
    const { documents } = structure;

    if (documents.router) {
      edgeSchemaLoader.setRouter(structure.domain, documents.router);
    }
    if (documents.dictionaries) {
      if (Array.isArray(documents.dictionaries)) {
        documents.dictionaries.forEach((dictionary) => {
          edgeSchemaLoader.setDictionaries(structure.domain, dictionary);
        });
      } else {
        edgeSchemaLoader.setDictionaries(structure.domain, documents.dictionaries);
      }
    }

    if (documents.controller) {
      edgeSchemaLoader.setControllers(structure.domain, documents.controller);
    }
    if (documents.wsListeners) {
      edgeSchemaLoader.setWsListeners(structure.domain, documents.wsListeners);
    }

    if (documents.views) {
      if (Array.isArray(documents.views)) {
        documents.views.forEach((view) => {
          edgeSchemaLoader.setViews(structure.domain, view);
        });
      } else {
        edgeSchemaLoader.setViews(structure.domain, documents.views);
      }
    }
  }

  return structure.domain;
};
