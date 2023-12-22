import { useEffect } from 'react';
import { setView, getController } from '@Vendor';
import { AbstractTable } from '@Ui';

import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export type SysUsersDatasetViewProps = {
  className?: string;
};

export const SysUsersDatasetView = setView<NSysUsers.Forms, SysUsersDatasetViewProps>({
  name: 'dataset',
  View: (props) => {
    useEffect(() => {
      const start = async () => {
        const result = await getController<NSysUsers.LoginPayload, { first: string }>(
          'SysUsers',
          'v1/login',
          {
            phone: '+380951696263',
            password: '12345',
          }
        );
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
