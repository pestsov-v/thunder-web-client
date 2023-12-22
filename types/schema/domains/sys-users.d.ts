export namespace NSysUsers {
  export type Paths = 'v1/login';
  export type Events = 'v1:add:user' | 'v1:remove:user';
  export type Forms = 'dataset' | 'profile';
  export type Dictionary = {
    user: {
      table: {
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
