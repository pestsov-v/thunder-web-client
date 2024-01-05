import { RouterStructure } from '@Edge/Types';

export const setRouter = <T extends string, D extends string = string>(
  structure: RouterStructure<T, D>
): RouterStructure<T, D> => {
  return structure;
};
