import { setValidator } from '@Vendor';
import { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersValidator = setValidator<NSysUsers.Paths>({
  'v1/login': {
    inSchema: (validator, body: string) => {
      return null;
    },
  },
});
