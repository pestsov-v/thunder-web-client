import type { Zod } from '@Edge/Package/Types';

export namespace NSysAuth {
  export type Paths =
    | 'v1/signup'
    | 'v1/login'
    | 'v1/logout'
    | 'v1/forgotPassword'
    | 'v1/revalidateAccessToken';

  export type Views = 'sign-in';

  // Routes param

  // Signup Validate schema
  export type SignupInSchema = {
    firstName: Zod.ZodString;
    lastName: Zod.ZodString;
    phone: Zod.ZodOptional<Zod.ZodString>;
    email: Zod.ZodOptional<Zod.ZodString>;
    password: Zod.ZodString;
    confirmPassword: Zod.ZodString;
  };
  // Signup action params
  export type SignupIn = {
    firstName: string;
    lastName: string;
    phone?: string;
    email?: string;
    password: string;
    confirmPassword: string;
  };
}
