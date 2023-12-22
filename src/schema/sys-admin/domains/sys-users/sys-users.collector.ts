import { setCollector } from '@Vendor';
import { domainNames } from '../../common/domain-names';

import {
  SysUsersRouter,
  SysUsersController,
  SysUsersDatasetView,
  SysUsersProfileView,
  SysUsersDictionaryEN,
  SysUsersDictionaryRU,
  SysUsersDictionaryUA,
  SysUsersStore,
  SysUsersWsListener,
} from './index';

export const SysUsersCollector = setCollector({
  domain: domainNames.SYS_USERS,
  documents: {
    controller: SysUsersController,
    router: SysUsersRouter,
    store: SysUsersStore,
    wsListeners: SysUsersWsListener,
    dictionaries: [SysUsersDictionaryEN, SysUsersDictionaryRU, SysUsersDictionaryUA],
    views: [SysUsersProfileView, SysUsersDatasetView],
  },
});
