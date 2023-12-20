import { injectable, inject } from '@Edge/Package';
import { EdgeSymbols } from '@EdgeSymbols';

import type {
  IGetawayService,
  IInitiator,
  ILocalizationService,
  ISchemaService,
} from '@Edge/Types';

@injectable()
export class Initiator implements IInitiator {
  constructor(
    @inject(EdgeSymbols.SchemaService)
    private readonly _schemaService: ISchemaService,
    @inject(EdgeSymbols.GetawayService)
    private readonly _getawayService: IGetawayService,
    @inject(EdgeSymbols.LocalizationService)
    private readonly _localizationService: ILocalizationService
  ) {}

  public start(): void {
    this._schemaService.start();
    this._getawayService.start();
    this._localizationService.start();
  }

  public stop(): void {
    this._localizationService.stop();
    this._getawayService.stop();
    this._schemaService.stop();
  }
}
