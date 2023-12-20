import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { languageTypes } from '@Schema/sys-admin/common/language-types';

export const SysUsersDictionaryEn: NSysUsers.Dictionary = {
  language: languageTypes.EN,
  dictionary: {
    user: {
      table: {
        role: 'Role',
      },
    },
  },
};
