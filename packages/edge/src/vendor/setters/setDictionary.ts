import type { DictionaryStructure, NSchemaService } from '@Edge/Types';

export const setDictionary = <
  L extends string = string,
  D extends NSchemaService.Dictionary = NSchemaService.Dictionary,
>(
  structure: DictionaryStructure<L, D>
): DictionaryStructure<L, D> => {
  return structure;
};
