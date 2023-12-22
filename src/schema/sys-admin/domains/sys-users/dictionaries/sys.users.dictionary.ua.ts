import { setDictionary } from '@Setters';

import type { LanguageKind } from '@Schema/Types/common/language-type';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersDictionaryUA = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'ua',
  dictionary: {
    user: {
      table: {
        role: 'Роль',
      },
    },
  },
});
