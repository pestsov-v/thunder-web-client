import {
  ItemProps,
  LanguageDropdown,
} from '@Schema/sys-admin/layouts/widgets/Header/shared/LanguageDropdown';
import UkraineIcon from '../assets/icons/flags/ukraine.svg';
import RussianIcon from '../assets/icons/flags/russian.svg';
import UkIcon from '../assets/icons/flags/united-kingdom.svg';

export const MainLayout = () => {
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

  return <LanguageDropdown items={items} />;
};
