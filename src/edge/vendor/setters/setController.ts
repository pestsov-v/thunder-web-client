import type { ControllerStructure } from '@Setters/Types';

export const setController = <T extends string = string>(
  structure: ControllerStructure<T>
): ControllerStructure<T> => {
  return structure;
};
