import { useDomain } from './useDomain';
import { UseViewProps } from './useView';

const usePrepareView = (props: UseViewProps) => {
  const storage = useDomain(props.domain);
  if (storage) {
    const Component = storage.views.get(props.view);
    if (Component) {
      return <Component />;
    }
  }
  return null;
};

export default usePrepareView;
