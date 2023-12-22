import { setDictionary } from '@Vendor';

import type { LanguageKind } from '@Schema/Types/common/language-type';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersDictionaryRU = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'ru',
  dictionary: {
    user: {
      table: {
        fullName: 'Полное імя',
        login: 'Логин',
        email: 'Електронна почта',
        phone: 'Телефон',
        createdAt: 'Создан',
        isBLocked: 'Заблокирован',
        isVerifies: 'Верифицирован',
        maxSessions: 'Количество сессий',
        role: 'Роль',
      },
    },
  },
});
