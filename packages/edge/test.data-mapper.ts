import { NSchemaService } from './types';

export const TestDataMapper = {
  'v1/login': async (agents: NSchemaService.Agents): Promise<void> => {
    try {
      const data = await agents.fnAgent.schema.sendRequest<'SysAdmin', 'SysLog', 'v1/login'>(
        'SysAdmin',
        'SysLog',
        'v1/login',
        'POST',
        {
          data: {
            firstName: 'v1',
            password: 'test',
          },
        }
      );
    } catch (e) {}
  },
};
