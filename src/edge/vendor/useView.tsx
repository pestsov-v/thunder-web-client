import { FC } from 'react';
import dynamic from 'next/dynamic';

export type UseViewProps = {
  domain: string;
  view: string;
  props?: unknown;
};

export const UseView: FC<UseViewProps> = ({ domain, view, props }) => {
  const DynamicComponent = dynamic(() => import('./usePrepareView'), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });

  return <DynamicComponent domain={domain} view={view} props={props} />;
};
