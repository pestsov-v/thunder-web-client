import { AnyObject, ViewStructure } from '@Edge/Types';

export const setView = <N extends string, P = AnyObject>(
  structure: ViewStructure<N, P>
): ViewStructure<N, P> => {
  return structure;
};
