import { FC } from 'react';
import dynamic from 'next/dynamic';
import React from 'react';

export type UseViewProps = {
  domain: string;
  view: string;
  props?: unknown;
};

export const GetView: FC<UseViewProps> = ({ domain, view, props }) => {
  const DynamicComponent = dynamic(() => import('./getPrepareView'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });

  return <DynamicComponent domain={domain} view={view} props={props} />;
};
