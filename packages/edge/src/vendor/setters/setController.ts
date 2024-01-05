import { ControllerStructure } from '@Edge/Types';

export const setController = <T extends string = string>(
  structure: ControllerStructure<T>
): ControllerStructure<T> => {
  return structure;
};
