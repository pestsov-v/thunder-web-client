import { ReactElement } from 'react';
import { FooterWidget, NavbarWidget, SidebarWidget } from '@Schema/sys-admin/layouts/widgets';

export type MainLayoutProps = {
  children: ReactElement;
};

export const MainLayout = (props: MainLayoutProps): ReactElement => {
  return (
    <div>
      <NavbarWidget />
      <SidebarWidget />
      {props.children}
      <FooterWidget />
    </div>
  );
};
