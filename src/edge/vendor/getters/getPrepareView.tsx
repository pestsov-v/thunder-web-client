import { GetDomain } from './getDomain';
import { UseViewProps } from './getView';

const GetPrepareView = (props: UseViewProps) => {
  const storage = GetDomain(props.domain);
  if (storage) {
    const Component = storage.views.get(props.view);
    if (Component) {
      return <Component />;
    }
  }
  return null;
};

export default GetPrepareView;
