import { WsListenerStructure } from '@Edge/Types';

export const setWsListener = <T extends string = string>(
  structure: WsListenerStructure<T>
): WsListenerStructure<T> => {
  return structure;
};
