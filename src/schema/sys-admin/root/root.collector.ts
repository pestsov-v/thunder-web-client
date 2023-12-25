import { setCollector } from '@Vendor';
import { RootStore } from '@Schema/sys-admin/root/root.store';

export const RootCollector = setCollector({
  domain: 'Root',
  documents: {
    store: RootStore,
  },
});
