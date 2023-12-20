import { domainNames } from '../../common/domain-names';
import { SysUsersRouter } from './sys-users.router';
import { SysUsersDictionaryEn } from '@Schema/sys-admin/domains/sys-users/sys.users.dictionary.en';
import { SysUsersDictionaryRu } from '@Schema/sys-admin/domains/sys-users/sys.users.dictionary.ru';
import { SysUsersDictionaryUa } from '@Schema/sys-admin/domains/sys-users/sys.users.dictionary.ua';

import type { CollectorStructure } from '@Vendor/Types';

export const SysUsersCollector: CollectorStructure = {
  domain: domainNames.SYS_USERS,
  documents: {
    router: SysUsersRouter,
    dictionaries: [SysUsersDictionaryEn, SysUsersDictionaryRu, SysUsersDictionaryUa],
  },
};
