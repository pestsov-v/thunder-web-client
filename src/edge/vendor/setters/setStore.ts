import type { StoreStructure } from '@Setters/Types';
import type { AnyObject } from '@Utility/Types';

export const setStore = <T extends string, B = AnyObject, A = AnyObject>(
  structure: StoreStructure<T, B, A>
): StoreStructure<T, B, A> => {
  return structure;
};
