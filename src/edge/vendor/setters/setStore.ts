import type { StoreStructure } from '@Setters/Types';

export const setStore = <T extends string, B, A>(
  structure: StoreStructure<T, B, A>
): StoreStructure<T, B, A> => {
  return structure;
};
