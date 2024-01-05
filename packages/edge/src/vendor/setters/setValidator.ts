import { ValidatorStructure } from '@Edge/Types';

export const setValidator = <T extends string = string>(structure: ValidatorStructure<T>) => {
  return structure;
};
1;
