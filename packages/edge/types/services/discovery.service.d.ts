import type { IAbstractService } from './abstract.service';
import { KeyConfigLiteralBuilder } from '../utility';

export interface IDiscoveryService extends IAbstractService {
  readonly nodeEnv: string;

  getMandatory<T>(name: string): T;
  getString(
    name: KeyConfigLiteralBuilder<NDiscoveryService.EnvsConfig, string>,
    def: string
  ): string;
  getNumber(
    name: KeyConfigLiteralBuilder<NDiscoveryService.EnvsConfig, number>,
    def: number
  ): number;
  getBoolean(
    name: KeyConfigLiteralBuilder<NDiscoveryService.EnvsConfig, boolean>,
    def: boolean
  ): boolean;
  getArray<T>(
    name: KeyConfigLiteralBuilder<NDiscoveryService.EnvsConfig, Array<T>>,
    def: Array<T>
  ): Array<T>;
}

export namespace NDiscoveryService {
  export type EnvsConfig = {
    integrations: {
      mapbox: {
        token: string;
      };
      sentry: {
        enable: boolean;
        token: string;
        logLevel: string;
        tracesSampleRate: number;
        replaysSessionSampleRate: number;
        replaysOnErrorSampleRate: number;
      };
    };
    adapters: {
      ws: {
        enable: boolean;
        connect: {
          protocol: 'ws' | 'wss';
          host: string;
          port: number;
        };
      };
    };
    services: {
      localization: {
        fallbackLanguage: string;
        defaultLanguage: string;
        supportedLanguages: string[];
      };
      getaway: {
        protocol: string;
        host: string;
        port: number;
        urls: {
          baseApiUrl: string;
          baseExceptionUrl: string;
        };
      };
    };
    strategies: {
      database: {
        enable: boolean;
        type: string;
        name: string;
        defaultVersion: number;
      };
    };
  };
}
