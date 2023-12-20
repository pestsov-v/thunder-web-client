import { domainNames } from '../../common/domain-names';
import { SysUsersRouter } from './sys-users.router';
import { SysUsersController } from '@Schema/sys-admin/domains/sys-users/sys-users.controller';
import {
  SysUsersDatasetView,
  SysUsersProfileView,
} from '@Schema/sys-admin/domains/sys-users/views';
import {
  SysUsersDictionaryEn,
  SysUsersDictionaryRu,
  SysUsersDictionaryUa,
} from '@Schema/sys-admin/domains/sys-users/dictionaries';

import type { CollectorStructure } from '@Vendor/Types';

export const SysUsersCollector: CollectorStructure = {
  domain: domainNames.SYS_USERS,
  documents: {
    controller: SysUsersController,
    router: SysUsersRouter,
    dictionaries: [SysUsersDictionaryEn, SysUsersDictionaryRu, SysUsersDictionaryUa],
    views: [SysUsersDatasetView, SysUsersProfileView],
  },
};
