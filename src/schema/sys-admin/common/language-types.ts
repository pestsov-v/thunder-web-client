import { LanguageType } from '@Schema/Types/common/language-type';

export const languageTypes: Record<Uppercase<LanguageType>, LanguageType> = {
  EN: 'en',
  RU: 'ru',
  UA: 'ua',
} as const;
