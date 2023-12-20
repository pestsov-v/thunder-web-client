import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { NSchemaService } from '@Edge/Types';

export const SysUsersController: NSysUsers.Controller = {
  'v1/login': async (
    agents,
    context: NSchemaService.Context<NSysUsers.LoginPayload>
  ): Promise<void> => {
    try {
      const result = await agents.fnAgent.schema.sendRequest({
        route: 'v1/login',
        domain: 'SysUsers',
        method: 'POST',
        data: context.body,
      });
      console.log('#RESULT', result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
};
