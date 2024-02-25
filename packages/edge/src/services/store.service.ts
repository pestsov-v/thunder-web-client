import { injectable, inject, persist, create, createJSONStorage, devtools } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';
import { AbstractService } from './abstract.service';
import { Helpers } from '../utils';

import type {
  Zustand,
  IDiscoveryService,
  ISchemaService,
  IStoreService,
  NSchemaService,
} from '@Edge/Types';

@injectable()
export class StoreService extends AbstractService implements IStoreService {
  protected readonly _SERVICE_NAME = StoreService.name;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService
  ) {
    super();
  }

  protected destroy(): void {}

  protected init(): boolean {
    return true;
  }

  public createStore<T>(
    service: string,
    domain: string,
    store: string
  ): Zustand.StateCreator<T> | Zustand.PersistStateCreator<T> {
    const sStorage = this._schemaService.services.get(service);
    if (!sStorage) {
      throw new Error(`Service storage "${service}" not found`);
    }

    const dStorage = sStorage.get(domain);
    if (!dStorage) {
      throw new Error(`Domain storage "${domain}" not found`);
    }

    const config = dStorage.store.get(store);
    if (!config) {
      throw new Error(`Store configuration "${store}" not found`);
    }

    const internalConfig: NSchemaService.Store = {
      partiality: config.partiality ?? undefined,
      version: config.version ?? 1,
      persistence: config.persistence ?? 'persist',
      storage: config.storage ?? 'localStorage',
      skipHydration: config.skipHydration ?? true,
      actions: config.actions,
    };

    let creator: Zustand.StateCreator<T> | Zustand.PersistStateCreator<T>;
    switch (internalConfig.persistence) {
      case 'persist':
        creator = persist<T>(internalConfig.actions, {
          skipHydration: internalConfig.skipHydration,
          name: store,
          storage: createJSONStorage(() =>
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

    return this._discoveryService.nodeEnv === 'production'
      ? create(creator)
      : create(devtools(creator, { name: store }));
  }
}
