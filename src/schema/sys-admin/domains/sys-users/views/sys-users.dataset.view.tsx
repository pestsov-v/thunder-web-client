import { UseController } from '@Vendor';
import { useEffect } from 'react';

import type { ViewStructure } from '@Vendor/Types';
import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export type SysUsersDatasetViewProps = {
  className?: string;
};

export const SysUsersDatasetView: ViewStructure<NSysUsers.Forms, SysUsersDatasetViewProps> = {
  name: 'dataset',
  View: (props) => {
    useEffect(() => {
      const start = async () => {
        const result = await UseController<NSysUsers.LoginPayload, { first: string }>(
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

    return <div>USERS_DATASET</div>;
  },
};
