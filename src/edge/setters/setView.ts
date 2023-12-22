import type { ViewStructure } from '@Setters/Types';

export const setView = <N extends string, P>(
  structure: ViewStructure<N, P>
): ViewStructure<N, P> => {
  return structure;
};
