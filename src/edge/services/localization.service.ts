import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';
import { AbstractService } from './abstract.service';

import type { StringObject } from '@Utility/Types';
import type {
  ILocalizationService,
  ISchemaService,
  NLocalizationService,
  NSchemaService,
} from '@Edge/Types';

@injectable()
export class LocalizationService extends AbstractService implements ILocalizationService {
  protected _SERVICE_NAME = LocalizationService.name;
  private _CONFIG: NLocalizationService.Config | undefined;

  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  protected init(): boolean {
    this._CONFIG = {
      fallbackLanguage: 'en',
      defaultLanguage: 'en',
      supportedLanguages: ['en', 'ru', 'ua'],
    };

    return true;
  }

  protected destroy(): void {
    this._CONFIG = undefined;
  }

  private get _config(): NLocalizationService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  public get supportedLanguages(): string[] {
    return this._config.supportedLanguages;
  }

  public get defaultLanguage(): string {
    return this._config.defaultLanguage;
  }

  public get fallbackLanguage(): string {
    return this._config.fallbackLanguage;
  }

  public getDefaultLnResource(
    domain: string,
    resource: string,
    substitutions?: StringObject
  ): string {
    return this.getResource(domain, this.defaultLanguage, resource, substitutions);
  }

  public getResource(
    domain: string,
    language: string,
    resource: string,
    substitutions?: Record<string, string>
  ): string {
    const dStorage = this._schemaService.schema.get(domain);
    if (!dStorage) {
      throw new Error('Domain storage not found');
    }

    const dictionary = dStorage.dictionaries.get(language);
    if (!dictionary) {
      throw new Error(`Dictionary with "${language}" type not found`);
    }

    try {
      const keys = resource.split(':');
      let record: NSchemaService.Dictionary | string = dictionary;

      if (keys.length > 1) {
        for (const key of keys) {
          if (typeof record !== 'string') {
            record = record[key];
          } else {
            if (substitutions) {
              for (const substitution in substitutions) {
                if (typeof record !== 'string') {
                  record = record.replace('{{' + substitution + '}}', substitutions[substitution]);
                }
              }
              return record;
            } else {
              return record;
            }
          }
        }
        return record;
      } else {
        return record[resource];
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
