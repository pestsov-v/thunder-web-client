import { setDictionary } from '@Vendor';

import type { LanguageKind } from '@Schema/Types/common/language-type';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersDictionaryEN = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'en',
  dictionary: {
    user: {
      table: {
        fullName: 'Full name',
        login: 'Login',
        email: 'Email',
        phone: 'Phone',
        createdAt: 'Created at',
        isBLocked: 'Block',
        isVerifies: 'Verify',
        maxSessions: 'Max sessions',
        role: 'Role',
      },
    },
  },
});
