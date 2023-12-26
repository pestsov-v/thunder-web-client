import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { NSchemaService } from '@Edge/Types';
import { setController } from '@Vendor';

export const SysUsersController = setController<NSysUsers.Paths>({
  'v1/login': async (
    agents: NSchemaService.Agents,
    context: NSchemaService.Context<NSysUsers.LoginPayload>
  ): Promise<void> => {
    const { storage, schema } = agents.fnAgent;

    try {
      const result = await schema.sendRequest('v1/login', 'SysUsers', 'POST', {
        data: context.body,
      });

      console.log(result);
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
  'v1/signup': {},
});
