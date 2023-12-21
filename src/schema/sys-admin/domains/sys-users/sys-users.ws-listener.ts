import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { NSchemaService } from '@Edge/Types';

export const SysUsersWsListener: NSysUsers.WsListeners = {
  'v1:add:user': {
    type: 'client:broadcast:to:app',
    isPrivateUser: false,
    isPrivateOrganization: false,
    handler: (agents: NSchemaService.Agents, context: NSchemaService.Context) => {
      console.log(agents);
    },
  },
  'v1:remove:user': {
    isPrivateUser: false,
    isPrivateOrganization: false,
    type: 'client:session:to:session',
    handler: (agents: NSchemaService.Agents, context: NSchemaService.Context) => {
      console.log(agents);
    },
  },
};
