import { LanguageKind } from '@Schema/Types/common/language-type';

export const languageTypes: Record<Uppercase<LanguageKind>, LanguageKind> = {
  EN: 'en',
  RU: 'ru',
  UA: 'ua',
} as const;
