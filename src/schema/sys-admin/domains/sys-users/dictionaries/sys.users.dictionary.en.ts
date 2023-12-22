import { setDictionary } from '@Vendor';

import type { LanguageKind } from '@Schema/Types/common/language-type';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersDictionaryEN = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'en',
  dictionary: {
    user: {
      table: {
        role: 'Role',
      },
    },
  },
});
