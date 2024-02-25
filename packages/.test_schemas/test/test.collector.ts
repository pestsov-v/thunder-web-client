import { setCollector } from '../../edge/src';
import { SysUsersDatasetView } from './SysUsers.dataset.view';

export const testCollector = setCollector('test', {
  views: [SysUsersDatasetView],
});
