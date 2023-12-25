import { Zod } from '@Edge/Package/Types';
import { zod } from '@Edge/Package';
import { setValidator } from '@Vendor';
import type { NSysAuth } from '@Schema/Types/domains/sys-auth';

export const SysUsersValidator = setValidator<NSysAuth.Paths>({
  'v1/login': {
    inSchema: (): Zod.ZodObject<NSysAuth.SignupInSchema> => {
      return zod.object<NSysAuth.SignupInSchema>({
        firstName: zod.string().min(3),
        lastName: zod.string().min(3),
        email: zod.string().email().optional(),
        phone: zod.string().min(13).max(13).optional(),
        password: zod.string().min(3),
        confirmPassword: zod.string().min(3),
      });
    },
  },
});
