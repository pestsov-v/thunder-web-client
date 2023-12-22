import { NSysUsers } from '@Schema/Types/domains/sys-users';
import { NSchemaService } from '@Edge/Types';
import { setController } from '@Setters';

export const SysUsersController = setController<NSysUsers.Paths>({
  'v1/login': async (
    agents: NSchemaService.Agents,
    context: NSchemaService.Context<NSysUsers.LoginPayload>
  ): Promise<void> => {
    const { storage, schema } = agents.fnAgent;

    try {
      const result = await schema.sendRequest({
        route: 'v1/login',
        domain: 'SysUsers',
        method: 'POST',
        data: context.body,
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  },
});
