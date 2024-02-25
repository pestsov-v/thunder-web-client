import { FC } from 'react';
import dynamic, { DynamicOptionsLoadingProps } from 'next/dynamic';
import React from 'react';

export type UseViewProps<T = any> = {
  service: string;
  domain: string;
  view: string;
  props?: T;
  ssr?: boolean;
  loading?: (loadingProps: DynamicOptionsLoadingProps) => JSX.Element | null;
};

export const GetView: FC<UseViewProps> = ({ service, domain, view, props, ssr, loading }) => {
  const DynamicComponent = dynamic(() => import('./getPrepareView'), {
    ssr: ssr ?? false,
    loading: loading ?? (() => <div>loading...</div>),
  });

  if (DynamicComponent) {
    return <DynamicComponent service={service} domain={domain} view={view} props={props} />;
  } else {
    return <div></div>;
  }
};
