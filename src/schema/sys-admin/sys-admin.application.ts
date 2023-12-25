import { setApplication } from '@Vendor';
import { RootCollector } from '@Schema/sys-admin/root/root.collector';
import { SysUsersCollector } from '@Schema/sys-admin/domains/sys-users/sys-users.collector';

setApplication([SysUsersCollector], RootCollector);
