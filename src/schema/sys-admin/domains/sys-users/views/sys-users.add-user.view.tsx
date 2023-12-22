import { setView } from '@Vendor';
import { useForm } from 'react-hook-form';

import type { NSysUsers } from '@Schema/Types/domains/sys-users';
import { Input } from '@nextui-org/input';
import { Button } from '@nextui-org/react';

export type SysUsersAddUserViewProps = {
  className?: string;
};

export const SysUsersAddUserView = setView<NSysUsers.Forms, SysUsersAddUserViewProps>({
  name: 'add-user',
  View: (props) => {
    const { register, handleSubmit, watch, formState } = useForm<{ firstName: string }>();

    const onSubmit = (data: any) => console.log(data);

    console.log(watch('firstName'));

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input defaultValue={'test'} {...register('firstName')} color={'warning'} isRequired />
        <Button type={'submit'}>Додати</Button>
      </form>
    );
  },
});
