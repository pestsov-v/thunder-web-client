import { setDictionary } from '@Vendor';

import type { LanguageKind } from '@Schema/Types/common/language-type';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersDictionaryUA = setDictionary<LanguageKind, NSysUsers.Dictionary>({
  language: 'ua',
  dictionary: {
    user: {
      table: {
        fullName: "Повне ім'я",
        login: 'Логін',
        email: 'Електронна пошта',
        phone: 'Телефон',
        createdAt: 'Створений',
        isBLocked: 'Заблокований',
        isVerifies: 'Верифікований',
        maxSessions: 'Кількість сессій',
        role: 'Роль',
      },
    },
  },
});
