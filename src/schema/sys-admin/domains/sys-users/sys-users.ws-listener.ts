import { setWsListener } from '@Vendor';

import type { NSysUsers } from '@Schema/Types/domains/sys-users';
import type { NSchemaService } from '@Edge/Types';

export const SysUsersWsListener = setWsListener<NSysUsers.Events>({
  'v1:add:user': {
    type: 'client:broadcast:to:app',
    isPrivateUser: false,
    isPrivateOrganization: false,
    handler: async (agents: NSchemaService.Agents, context: NSchemaService.Context) => {},
  },
  'v1:remove:user': {
    isPrivateUser: false,
    isPrivateOrganization: false,
    type: 'client:session:to:session',
    handler: async (agents: NSchemaService.Agents, context: NSchemaService.Context) => {},
  },
});
