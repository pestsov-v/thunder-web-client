import { ViewStructure } from '@Vendor/Types';
import { NSysUsers } from '@Schema/Types/domains/sys-users';

export type SysUsersDatasetViewProps = {
  className?: string;
};

export const SysUsersDatasetView: ViewStructure<NSysUsers.Forms, SysUsersDatasetViewProps> = {
  name: 'dataset',
  view: (props) => {
    return <div>USERS_DATASET</div>;
  },
};
