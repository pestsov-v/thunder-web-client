import { setView } from '@Vendor';

import type { NSysUsers } from '@Schema/Types/domains/sys-users';

export type SysUsersProfileViewProps = {
  className?: string;
};

export const SysUsersProfileView = setView<NSysUsers.Forms, SysUsersProfileViewProps>({
  name: 'profile',
  View: (props) => {
    return <div>USER_PROFILE</div>;
  },
});
