import type { IAbstractService } from './abstract.service';
import type { StringObject } from '@Utility/Types';

export interface ILocalizationService extends IAbstractService {
  readonly supportedLanguages: string[];
  readonly defaultLanguage: string;
  readonly fallbackLanguage: string;

  getDefaultLnResource(domain: string, resource: string, substitutions?: StringObject): string;

  getResource(
    domain: string,
    resource: string,
    language: string,
    substitutions?: StringObject
  ): string;
}

export namespace NLocalizationService {
  export type Config = {
    supportedLanguages: string[];
    defaultLanguage: string;
    fallbackLanguage: string;
  };
}
