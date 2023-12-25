import { setController } from '@Vendor';
import { NSysAuth } from '@Schema/Types/domains/sys-auth';
import { DomainsKind } from '@Schema/Types/common/domains';
import { NSchemaService } from '@Edge/Types';

export const SysAuthController = setController<NSysAuth.Paths>({
  'v1/signup': async (
    agents: NSchemaService.Agents,
    context: NSchemaService.Context<NSysAuth.SignupIn>
  ) => {
    if (!context.body) {
      throw new Error(`Content body for v1/signup route is required`);
    }

    const { schema } = agents.fnAgent;

    try {
      const response = await schema.sendRequest<NSysAuth.Paths, DomainsKind>(
        'v1/login',
        'SysUsers',
        'POST',
        {
          data: context.body,
        }
      );

      const status = response.status.toString();
      if (status.startsWith('2')) {
        console.log('status 2', response);
      } else if (status.startsWith('4')) {
        console.log('status 4', response);
      } else {
        console.log('status any', response);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  },
  'v1/login': async (agents: NSchemaService.Agents, context: NSchemaService.Context) => {},
  'v1/logout': async (agents: NSchemaService.Agents, context: NSchemaService.Context) => {},
  'v1/forgotPassword': async (agents: NSchemaService.Agents, context: NSchemaService.Context) => {},
  'v1/revalidateAccessToken': async (
    agents: NSchemaService.Agents,
    context: NSchemaService.Context
  ) => {},
});
