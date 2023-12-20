import { SysAdminDomains } from '../../common/SysAdminDomains';
import { SysUsersRouter } from './sys-users.router';

import type { CollectorStructure } from '@Vendor/Types';

export const SysUsersCollector: CollectorStructure = {
  domain: SysAdminDomains.SYS_USERS,
  documents: {
    router: SysUsersRouter,
  },
};
