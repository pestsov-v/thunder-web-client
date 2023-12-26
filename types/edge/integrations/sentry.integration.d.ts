import type { IAbstractIntegration } from './abstract.integration';

export interface ISentryIntegration extends IAbstractIntegration {
  captureException(exception: any): void;
  captureFatalMessage(message: string): void;
  captureErrorMessage(message: string): void;
  captureWarningMessage(message: string): void;
  captureLogMessage(message: string): void;
  captureInfoMessage(message: string): void;
  captureDebugMessage(message: string): void;
}

export namespace NSentryIntegration {
  export type LogLevels = 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug';

  export type Config = {
    enable: boolean;
    token: string;
    tracesSampleRate: number; // 0 - 100
    replaysSessionSampleRate: number;
    replaysOnErrorSampleRate: number;
    logLevel: LogLevels;
  };
}
