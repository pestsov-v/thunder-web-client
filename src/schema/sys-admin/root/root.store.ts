import { setStore } from '@Vendor';

import type { Root } from '@Schema/Types/root';

export const RootStore = setStore<Root.Store, Root.InitialState, Root.StoreActions>({
  Root: {
    actions: (setState, getState) => {
      return {
        actualLanguage: 'ru',
        setActualLanguage: (ln) => setState((state) => ({ ...state, actualLanguage: ln })),
        getActualLanguage: () => getState().actualLanguage,
      };
    },
  },
});
