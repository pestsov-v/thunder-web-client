import type { NSchemaService } from '@Edge/Types';
import type { DictionaryStructure } from '@Setters/Types';

export const setDictionary = <
  L extends string = string,
  D extends NSchemaService.Dictionary = NSchemaService.Dictionary,
>(
  structure: DictionaryStructure<L, D>
): DictionaryStructure<L, D> => {
  return structure;
};
