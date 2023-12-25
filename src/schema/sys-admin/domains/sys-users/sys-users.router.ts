import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { setRouter } from '@Vendor';
import { DomainsKind } from '@Schema/Types/common/domains';

export const SysUsersRouter = setRouter<NSysUsers.Paths, DomainsKind>({
  'v1/login': {
    POST: {
      environment: 'edge',
      domain: 'SysUsers',
      service: 'SysAdmin',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/signup': {
    POST: {
      environment: '',
    },
  },
});
