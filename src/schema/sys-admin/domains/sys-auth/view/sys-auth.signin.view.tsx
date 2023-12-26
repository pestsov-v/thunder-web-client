import { getController, getValidator, setView } from '@Vendor';
import { NSysAuth } from '@Schema/Types/domains/sys-auth';
import { useForm } from 'react-hook-form';
import { Input } from '@nextui-org/input';
import { DomainsKind } from '@Schema/Types/common/domains';
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

export const SysAuthSignInView = setView<NSysAuth.Views>({
  name: 'sign-in',
  View: (props, context) => {
    const inSchema = getValidator<NSysAuth.Paths, DomainsKind>('v1/login', 'SysAuth', 'in');

    const { register } = useForm<NSysAuth.SignupIn>({
      resolver: zodResolver(inSchema),
    });

    useEffect(() => {
      const request = async () => {
        await getController<DomainsKind, NSysAuth.Paths>('SysUsers', 'v1/login');
      };

      request();
    }, []);

    return (
      <form>
        <Input
          type={'email'}
          isRequired={true}
          {...register('email')}
          label={'Email'}
          placeholder={'Enter your email'}
        />
      </form>
    );
  },
});
