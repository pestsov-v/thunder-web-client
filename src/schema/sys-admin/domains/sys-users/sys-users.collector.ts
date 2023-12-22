import { setCollector } from '@Vendor';
import { domainNames } from '../../common/domain-names';

import {
  SysUsersRouter,
  SysUsersController,
  SysUsersDatasetView,
  SysUsersProfileView,
  SysUsersAddUserView,
  SysUsersDictionaryEN,
  SysUsersDictionaryRU,
  SysUsersDictionaryUA,
  SysUsersStore,
  SysUsersWsListener,
  SysUsersValidator,
} from '.';

export const SysUsersCollector = setCollector({
  domain: domainNames.SYS_USERS,
  documents: {
    controller: SysUsersController,
    router: SysUsersRouter,
    validator: SysUsersValidator,
    store: SysUsersStore,
    wsListeners: SysUsersWsListener,
    dictionaries: [SysUsersDictionaryEN, SysUsersDictionaryRU, SysUsersDictionaryUA],
    views: [SysUsersProfileView, SysUsersDatasetView, SysUsersAddUserView],
  },
});
