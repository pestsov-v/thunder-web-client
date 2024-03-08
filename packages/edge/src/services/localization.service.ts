import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { AbstractService } from './abstract.service';

import type {
  IDiscoveryService,
  ILocalizationService,
  ISchemaService,
  NLocalizationService,
  NSchemaService,
  KeyStringLiteralBuilder,
  ExtendedRecordObject,
} from '@Edge/Types';

@injectable()
export class LocalizationService extends AbstractService implements ILocalizationService {
  protected _SERVICE_NAME = LocalizationService.name;
  private _CONFIG: NLocalizationService.Config | undefined;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  protected init(): boolean {
    this._CONFIG = {
      fallbackLanguage: this._discoveryService.getString(
        'services.localization.fallbackLanguage',
        'en'
      ),
      defaultLanguage: this._discoveryService.getString(
        'services.localization.defaultLanguage',
        'en'
      ),
      supportedLanguages: this._discoveryService.getArray<string>(
        'services.localization.supportedLanguages',
        ['en']
      ),
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

  public getDefaultLnResource<
    S extends string = string,
    DOM extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
    SUB extends Record<string, string> = Record<string, string>,
  >(
    services: S,
    domain: DOM,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: SUB
  ): string {
    return this.getResource<S, DOM, DICT, SUB, string>(
      services,
      domain,
      resource,
      substitutions,
      this.defaultLanguage
    );
  }

  public getDictionary<
    S extends string = string,
    DOM extends string = string,
    L extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
  >(service: S, domain: DOM, language: L): DICT {
    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      throw new Error('Service storage not found');
    }

    const dStorage = sStorage.get(domain);

    if (!dStorage) {
      throw new Error('Domain storage not found');
    }

    const dictionary = dStorage.dictionaries.get(language);
    if (!dictionary) {
      throw new Error(`Dictionary with "${language}" type not found`);
    }

    return dictionary as DICT;
  }

  public getResource<
    S extends string = string,
    DOM extends string = string,
    DICT extends ExtendedRecordObject = ExtendedRecordObject,
    SUB extends Record<string, string> = Record<string, string>,
    L extends string = string,
  >(
    service: S,
    domain: DOM,
    resource: KeyStringLiteralBuilder<DICT>,
    substitutions?: SUB,
    language?: L
  ): string {
    const dictionary = this.getDictionary<S, DOM, L, DICT>(
      service,
      domain,
      language ?? (this.defaultLanguage as L)
    );
    if (!dictionary) {
      throw new Error(`Dictionary with "${language}" type not found`);
    }

    try {
      const keys = resource.split('.');
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
