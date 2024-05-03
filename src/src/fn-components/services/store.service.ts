import { injectable, inject, zustand } from '~packages';
import { CoreSymbols } from '~symbols';
import { Helpers } from '../utils';
import { AbstractService } from './abstract.service';

import type {
  Zustand,
  IDiscoveryService,
  ISchemaService,
  IStoreService,
  NSchemaService,
  NStoreService,
} from '~types';

@injectable()
export class StoreService extends AbstractService implements IStoreService {
  protected readonly _SERVICE_NAME = StoreService.name;

  private _STORES: Map<string, NStoreService.Store> | undefined;
  private _CONFIG: NStoreService.Config | undefined;
  private _ROOT_STORE_NAME = '__$$__ROOT__$$__';

  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  private _setConfig(): void {
    this._CONFIG = {
      i18n: {
        defaultLanguage: this._discoveryService.getString(
          'services.localization.defaultLanguage',
          'en'
        ),
        fallbackLanguage: this._discoveryService.getString(
          'services.localization.fallbackLanguage',
          'en'
        ),
        supportedLanguages: this._discoveryService.getArray<string>(
          'services.localization.supportedLanguages',
          ['en']
        ),
      },
    };
  }

  private get _config(): NStoreService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  protected init(): boolean {
    this._setConfig();
    this._STORES = new Map<string, NStoreService.Store>();

    this.setRootStore();

    this._schemaService.services.forEach((sStorage, sName) => {
      sStorage.forEach((_, dName) => {
        this.createStore(sName, dName);
      });
    });

    return true;
  }

  protected destroy(): void {
    this._STORES = undefined;
  }

  private get _stores(): NStoreService.Stores {
    if (!this._STORES) {
      throw new Error(`Stores collection not set.`);
    }

    return this._STORES;
  }

  public createStore(service: string, domain: string): void {
    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      throw new Error(`Service storage "${service}" not found. `);
    }

    const dStorage = sStorage.get(domain);
    if (!dStorage) {
      throw new Error(`Domain storage "${domain}" not found. `);
    }

    const config = dStorage.store;
    if (!config) return;

    const internalConfig: NSchemaService.Store = {
      partiality: config.partiality ?? undefined,
      version: config.version ?? 1,
      persistence: config.persistence ?? 'persist',
      storage: config.storage ?? 'localStorage',
      skipHydration: config.skipHydration ?? true,
      actions: config.actions,
    };

    let creator: Zustand.StateCreator<unknown> | Zustand.PersistStateCreator<unknown>;
    switch (internalConfig.persistence) {
      case 'persist':
        creator = zustand.persist<unknown>(internalConfig.actions, {
          skipHydration: internalConfig.skipHydration,
          name: service + ':' + domain,
          storage: zustand.createJSONStorage(() =>
            internalConfig.storage === 'localStorage' ? localStorage : sessionStorage
          ),
        });
        break;
      case 'vanish':
        creator = internalConfig.actions;
        break;
      default:
        if (internalConfig.persistence) {
          throw Helpers.switchCaseChecker(internalConfig.persistence);
        } else {
          throw new Error('Persistence kind is undefined');
        }
    }

    this._stores.set(
      service + '{{' + domain + '}}',
      this._discoveryService.nodeEnv === 'production'
        ? zustand.create(creator)
        : zustand.create(zustand.devtools(creator, { name: service + ':' + domain }))
    );
  }

  public getStore<T>(
    service: string,
    domain: string
  ): Zustand.StateCreator<T> | Zustand.PersistStateCreator<T> {
    return this._stores.get(service + '{{' + domain + '}}');
  }

  private setRootStore(): void {
    const store: NStoreService.RootStore = {
      i18n: {
        defaultLanguage: this._config.i18n.defaultLanguage,
        fallbackLanguage: this._config.i18n.fallbackLanguage,
        supportedLanguages: this._config.i18n.supportedLanguages,
      },
    };

    this._stores.set(this._ROOT_STORE_NAME, store);
  }

  public get rootStore(): NStoreService.RootStore {
    return this._stores.get(this._ROOT_STORE_NAME);
  }
}
