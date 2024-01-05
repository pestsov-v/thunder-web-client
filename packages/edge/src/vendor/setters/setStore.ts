import { AnyObject, StoreStructure } from '@Edge/Types';

export const setStore = <T extends string, B = AnyObject, A = AnyObject>(
  structure: StoreStructure<T, B, A>
): StoreStructure<T, B, A> => {
  return structure;
};
