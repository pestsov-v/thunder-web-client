import { setView as schemeSetView } from '@chaminjector/typescheme';
import type { ViewStructure as SchemeViewStructure } from '@chaminjector/typescheme';
import type { FC } from 'react';
import type { AnyObject, ViewStructure } from '@Edge/Types';

export const setView = <N extends string, P = AnyObject>(
  structure: ViewStructure<N, P>
): SchemeViewStructure<N, FC<P>> => {
  return schemeSetView(structure.name, structure.View);
};
