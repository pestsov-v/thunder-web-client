import { setDictionary } from '@Vendor';

import type { LanguageKind } from '@Schema/Types/common/language-type';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersDictionaryRU = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'ru',
  dictionary: {
    user: {
      table: {
        role: 'Роль',
      },
    },
  },
});
