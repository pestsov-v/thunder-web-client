import type { LanguageKind } from '@Schema/Types/common/language-type';

export namespace Root {
  export type Store = 'Root';

  export type InitialState = {
    actualLanguage: LanguageKind;
  };
  export type StoreActions = {
    setActualLanguage: (ln: LanguageKind) => void;
    getActualLanguage: () => LanguageKind;
  };
}
