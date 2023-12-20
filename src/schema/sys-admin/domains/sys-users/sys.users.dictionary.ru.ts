import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { languageTypes } from '@Schema/sys-admin/common/language-types';

export const SysUsersDictionaryRu: NSysUsers.Dictionary = {
  language: languageTypes.RU,
  dictionary: {
    user: {
      table: {
        role: 'Роль',
      },
    },
  },
};
