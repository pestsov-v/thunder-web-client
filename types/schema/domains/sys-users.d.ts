import type {
  ControllerStructure,
  DictionaryStructure,
  RouterStructure,
  WsListenerStructure,
} from '@Vendor/Types';
import { LanguageType } from '@Schema/Types/common/language-type';

export namespace NSysUsers {
  export type Paths = 'v1/login';
  export type ClientWsEvents = 'v1:add:user' | 'v1:remove:user';
  export type Forms = 'dataset' | 'profile';

  export type WsListeners = WsListenerStructure<ClientWsEvents>;
  export type Controller = ControllerStructure<Paths>;

  export type Routes = RouterStructure<Paths>;
  export type Dictionary = DictionaryStructure<
    LanguageType,
    {
      user: {
        table: {
          role: string;
        };
      };
    }
  >;

  // Controller handlers params
  export type LoginPayload = {
    phone: string;
    password: string;
  };
}
