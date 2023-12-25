export namespace NSysUsers {
  export type Paths = 'v1/login' | 'v1/signup';
  export type Events = 'v1:add:user' | 'v1:remove:user';
  export type Forms = 'dataset' | 'profile' | 'add-user';
  export type Dictionary = {
    user: {
      table: {
        fullName: string;
        login: string;
        email: string;
        phone: string;
        maxSessions: string;
        isBLocked: string;
        isVerifies: string;
        createdAt: string;
        role: string;
      };
    };
  };

  // Controller handlers params
  export type LoginPayload = {
    phone: string;
    password: string;
  };
}
