import { useEffect, useState } from 'react';
import { setView, getController, getStore } from '@Vendor';
import { AbstractTable } from '@Ui';

import type { NSysUsers } from '@Schema/Types/domains/sys-users';
import type { Root } from '@Schema/Types/root';
import type { DomainsKind } from '@Schema/Types/common/domains';

export type SysUsersDatasetViewProps = {
  className?: string;
};

export const SysUsersDatasetView = setView<NSysUsers.Forms, SysUsersDatasetViewProps>({
  name: 'dataset',
  View: (props) => {
    const [result, setResult] = useState<any>();

    const store = getStore<Root.Store, Root.Store, Root.StoreActions>('Root', 'Root');

    const { getActualLanguage } = store();

    console.log(getActualLanguage());

    useEffect(() => {
      const start = async () => {
        const result = await getController<DomainsKind, NSysUsers.Paths, NSysUsers.LoginPayload>(
          'SysUsers',
          'v1/login',
          {
            phone: '+380951696263',
            password: '12345',
          }
        );

        setResult(result);
      };
      start();
    }, []);

    return (
      <div>
        <p>USERS_DATASET</p>
        <AbstractTable />
      </div>
    );
  },
});
