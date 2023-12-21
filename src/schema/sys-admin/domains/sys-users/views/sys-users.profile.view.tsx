import { ViewStructure } from '@Vendor/Types';
import { NSysUsers } from '@Schema/Types/domains/sys-users';

export type SysUsersProfileViewProps = {
  className?: string;
};

export const SysUsersProfileView: ViewStructure<NSysUsers.Forms, SysUsersProfileViewProps> = {
  name: 'profile',
  View: (props) => {
    return <div>USER_PROFILE</div>;
  },
};
