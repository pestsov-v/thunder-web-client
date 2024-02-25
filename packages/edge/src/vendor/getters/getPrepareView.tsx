import React from 'react';
import { GetDomain } from './getDomain';
import { UseViewProps } from './getView';

const GetPrepareView = (props: UseViewProps) => {
  const storage = GetDomain(props.service, props.domain);

  if (storage) {
    const Component: ((props: any) => React.JSX.Element) | undefined = storage.views.get(
      props.view
    );

    if (Component) {
      return <Component {...props.props} />;
    }
  }
};

export default GetPrepareView;
