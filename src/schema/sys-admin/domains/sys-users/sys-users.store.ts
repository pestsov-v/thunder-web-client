import { setStore } from '@Vendor';
import { DomainsKind } from '@Schema/Types/common/domains';

export const SysUsersStore = setStore<
  DomainsKind,
  { firstName: string },
  { add: () => Promise<void> }
>({
  SysUsers: {
    storage: 'localStorage',
    persistence: 'persist',
    version: 1,
    skipHydration: true,
    actions: (setState, getState, store) => ({
      firstName: '',
      add: async () => {},
    }),
  },
});
