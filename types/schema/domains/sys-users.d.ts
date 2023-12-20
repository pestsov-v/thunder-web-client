import type { DictionaryStructure, RouterStructure } from '@Vendor/Types';
import { LanguageType } from '@Schema/Types/common/language-type';

export namespace NSysUsers {
  export type Paths = 'v1/login';

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
}
