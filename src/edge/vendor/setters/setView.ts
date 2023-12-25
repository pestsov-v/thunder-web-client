import type { AnyObject } from '@Utility/Types';
import type { ViewStructure } from '@Setters/Types';

export const setView = <N extends string, P = AnyObject>(
  structure: ViewStructure<N, P>
): ViewStructure<N, P> => {
  return structure;
};
