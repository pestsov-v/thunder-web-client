import { ReactElement } from 'react';
import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react';
import {
  ItemProps,
  LanguageDropdown,
} from '@Schema/sys-admin/layouts/widgets/Navbar/shared/LanguageDropdown';
import UkraineIcon from '@Schema/sys-admin/assets/icons/flags/ukraine.svg';
import RussianIcon from '@Schema/sys-admin/assets/icons/flags/russian.svg';
import UkIcon from '@Schema/sys-admin/assets/icons/flags/united-kingdom.svg';

export const NavbarWidget = (): ReactElement => {
  const items: ItemProps[] = [
    {
      icon: UkraineIcon,
      language: 'ua',
      text: 'Українська',
    },
    {
      icon: RussianIcon,
      language: 'ru',
      text: 'Російська',
    },
    {
      icon: UkIcon,
      language: 'en',
      text: 'Англійська',
    },
  ];

  return (
    <Navbar>
      <NavbarContent>
        <NavbarItem style={{ width: '80%' }}></NavbarItem>
        <NavbarItem style={{ width: '10%', justifyContent: 'flex-end' }}>
          <LanguageDropdown items={items} />
        </NavbarItem>
        <NavbarItem style={{ width: '10%', justifyContent: 'flex-end' }}>
          <Button size={'md'} color={'success'}>
            Sign up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
