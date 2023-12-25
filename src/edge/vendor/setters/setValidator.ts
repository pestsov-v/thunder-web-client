import type { ValidatorStructure } from '@Setters/Types';

export const setValidator = <T extends string = string>(structure: ValidatorStructure<T>) => {
  return structure;
};
1;
