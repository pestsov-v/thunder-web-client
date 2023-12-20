import { NSysUsers, WsListeners } from '@Schema/Types/domains/sys-users';

export const SysUsersWsListener: NSysUsers.WsListeners = {
  'v1:add:user': {
    type: 'client:broadcast:to:app',
    handler: (agents, context) => {
      console.log('');
    },
  },
  'v1:remove:user': {
    type: 'client:session:to:session',
    handler: (agents, context) => {
      console.log('');
    },
  },
};
