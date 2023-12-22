import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ReactElement } from 'react';
import { LanguageKind } from '@Schema/Types/common/language-type';
import Image from 'next/image';

export type ItemProps = {
  icon: string;
  language: LanguageKind;
  text: string;
};

export type LanguageDropdownProps = {
  className?: string;
  buttonContent?: string;
  items: ItemProps[];
};

export const LanguageDropdown = (props: LanguageDropdownProps): ReactElement => {
  return (
    <Dropdown size={'sm'}>
      <DropdownTrigger>
        <Button>Language</Button>
      </DropdownTrigger>
      <DropdownMenu variant={'faded'}>
        {props.items.map((item) => (
          <DropdownItem
            startContent={<Image src={item.icon} alt={item.language} />}
            key={item.language}
          >
            {item.text}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
