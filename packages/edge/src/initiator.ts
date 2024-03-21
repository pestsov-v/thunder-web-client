import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@Edge/Symbols';

import type {
  IAuthService,
  IDiscoveryService,
  IGetawayService,
  IInitiator,
  ILocalizationService,
  ISchemaService,
  ISessionService,
  IStoreService,
} from '@Edge/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService,
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.GetawayService)
    private readonly _getawayService: IGetawayService,
    @inject(EdgeSymbols.LocalizationService)
    private readonly _localizationService: ILocalizationService,
    @inject(EdgeSymbols.SessionService)
    private readonly _sessionService: ISessionService,
    @inject(EdgeSymbols.StoreService)
    private readonly _storeService: IStoreService,
    @inject(EdgeSymbols.AuthService)
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
