import { injectable, inject } from '~package';
import { CoreSymbols } from '~symbols';

import type {
  IAuthService,
  IDiscoveryService,
  IGetawayService,
  IInitiator,
  ILocalizationService,
  ISchemaService,
  ISessionService,
  IStoreService,
} from '~types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(CoreSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(CoreSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(CoreSymbols.GetawayService)
    private readonly _getawayService: IGetawayService,
    @inject(CoreSymbols.LocalizationService)
    private readonly _localizationService: ILocalizationService,
    @inject(CoreSymbols.SessionService)
    private readonly _sessionService: ISessionService,
    @inject(CoreSymbols.StoreService)
    private readonly _storeService: IStoreService,
    @inject(CoreSymbols.AuthService)
    private readonly _authService: IAuthService
  ) {}

  public start(): void {
    this._discoveryService.start();
    this._schemaService.start();
    this._getawayService.start();
    this._localizationService.start();
    this._sessionService.start();
    this._storeService.start();
    this._authService.start();
  }

  public stop(): void {
    this._authService.stop();
    this._storeService.stop();
    this._sessionService.stop();
    this._localizationService.stop();
    this._getawayService.stop();
    this._schemaService.stop();
    this._discoveryService.stop();
  }
}
