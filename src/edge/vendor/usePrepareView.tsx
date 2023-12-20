import { useDomain } from './useDomain';
import { UseViewProps } from './useView';

const usePrepareView = (props: UseViewProps) => {
  const storage = useDomain(props.domain);
  if (storage) {
    return storage.views.get(props.view)(props.props);
  }
};

export default usePrepareView;
