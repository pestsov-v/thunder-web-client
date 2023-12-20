import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { languageTypes } from '@Schema/sys-admin/common/language-types';

export const SysUsersDictionaryUa: NSysUsers.Dictionary = {
  language: languageTypes.UA,
  dictionary: {
    user: {
      table: {
        role: 'Роль',
      },
    },
  },
};
