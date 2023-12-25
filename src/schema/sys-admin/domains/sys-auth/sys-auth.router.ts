import { setRouter } from '@Vendor';
import { NSysAuth } from '@Schema/Types/domains/sys-auth';
import { DomainsKind } from '@Schema/Types/common/domains';

export const SysAuthRouter = setRouter<NSysAuth.Paths, DomainsKind>({
  'v1/signup': {
    POST: {
      environment: 'edge',
      domain: 'SysAuth',
      service: 'SysAdmin',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/login': {
    POST: {
      environment: 'edge',
      domain: 'SysAuth',
      service: 'SysAdmin',
      isPrivateUser: true,
      isPrivateOrganization: true,
    },
  },
  'v1/logout': {
    GET: {
      environment: 'edge',
      domain: 'SysAuth',
      service: 'SysAdmin',
      isPrivateUser: true,
      isPrivateOrganization: false,
    },
  },
  'v1/forgotPassword': {
    PATCH: {
      environment: 'edge',
      domain: 'SysAuth',
      service: 'SysAdmin',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
  'v1/revalidateAccessToken': {
    PATCH: {
      environment: 'edge',
      domain: 'SysAuth',
      service: 'SysAdmin',
      isPrivateUser: false,
      isPrivateOrganization: false,
    },
  },
});
