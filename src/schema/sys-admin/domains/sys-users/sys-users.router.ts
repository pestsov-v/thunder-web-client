import { NSysUsers } from '@Schema/Types/domains/sys-users';

export const SysUsersRouter: NSysUsers.Routes = {
  'v1/login': {
    POST: {
      domain: 'SysAuth',
      service: 'SysAdmin',
      environment: 'edge',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
};
