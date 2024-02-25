import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { AbstractService } from './abstract.service';

import type {
  StringObject,
  IDiscoveryService,
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

  public getDefaultLnResource(
    services: string,
    domain: string,
    resource: string,
    substitutions?: StringObject
  ): string {
    return this.getResource(services, domain, this.defaultLanguage, resource, substitutions);
  }

  public getResource(
    service: string,
    domain: string,
    language: string,
    resource: string,
    substitutions?: Record<string, string>
  ): string {
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
