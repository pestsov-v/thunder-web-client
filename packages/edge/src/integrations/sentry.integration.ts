import { EdgeSymbols } from '@Edge/Symbols';
import { injectable, inject, Sentry } from '@Edge/Package';
import { AbstractIntegration } from './abstract.integration';

import type { IDiscoveryService, ISentryIntegration, NSentryIntegration } from '@Edge/Types';

@injectable()
export class SentryIntegration extends AbstractIntegration implements ISentryIntegration {
  protected readonly _INTEGRATION_NAME = SentryIntegration.name;
  private _CONFIG: NSentryIntegration.Config | undefined;
  private _env: string;

  constructor(
    @inject(EdgeSymbols.DiscoveryService)
    private readonly _discoveryService: IDiscoveryService
  ) {
    super();
    this._env = 'development';
  }

  private _setConfig() {
    const logLevel = this._discoveryService.getString('integrations.sentry.logLevel', 'debug');

    const isLogLevel = (
      x: NSentryIntegration.LogLevels | string
    ): x is NSentryIntegration.LogLevels => {
      return (
        x === 'fatal' ||
        x === 'error' ||
        x === 'debug' ||
        x === 'log' ||
        x === 'info' ||
        x === 'warning'
      );
    };

    if (!isLogLevel(logLevel)) {
      throw new Error('Not supported log level type.');
    }

    this._CONFIG = {
      enable: this._discoveryService.getBoolean('integrations.sentry.enable', false),
      token: this._discoveryService.getString('integrations.sentry.token', ''),
      logLevel: logLevel,
      tracesSampleRate: this._discoveryService.getNumber(
        'integrations.sentry.tracesSampleRate',
        100
      ),
      replaysSessionSampleRate: this._discoveryService.getNumber(
        'integrations.sentry.replaysSessionSampleRate',
        0.1
      ),
      replaysOnErrorSampleRate: this._discoveryService.getNumber(
        'integrations.sentry.replaysOnErrorSampleRate',
        1.0
      ),
    };
  }

  private get _config(): NSentryIntegration.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set.');
    }

    return this._CONFIG;
  }

  public init(): boolean {
    this._env = this._discoveryService.nodeEnv;
    this._setConfig();

    if (!this._config.enable) return false;
    if (!this._config.token) {
      throw new Error('Sentry account token is undefined.');
    }

    Sentry.init({
      dsn: this._config.token,
      enabled: this._config.enable,
      debug: this._env !== 'production',
      environment: this._env,
      tracesSampleRate: this._config.tracesSampleRate,
      replaysSessionSampleRate: this._config.replaysSessionSampleRate,
      replaysOnErrorSampleRate: this._config.replaysOnErrorSampleRate,
    });

    Sentry.withScope((scope) => {
      scope.setLevel(this._config.logLevel);
    });

    return true;
  }

  public destroy() {
    Sentry.close();

    this._env = '';
    this._CONFIG = undefined;
  }

  public captureException(exception: any): void {
    Sentry.captureException(exception);
  }

  public captureFatalMessage(message: string): void {
    this._captureMessage(message, 'fatal');
  }

  public captureErrorMessage(message: string): void {
    this._captureMessage(message, 'error');
  }

  public captureWarningMessage(message: string): void {
    this._captureMessage(message, 'warning');
  }

  public captureLogMessage(message: string): void {
    this._captureMessage(message, 'log');
  }

  public captureInfoMessage(message: string): void {
    this._captureMessage(message, 'info');
  }

  public captureDebugMessage(message: string): void {
    this._captureMessage(message, 'debug');
  }

  private _captureMessage(message: string, level: NSentryIntegration.LogLevels) {
    Sentry.captureMessage(message, level);
  }
}
