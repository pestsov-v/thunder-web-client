import type { IAbstractService } from './abstract.service';
import { AnyObject, KeyConfigLiteralBuilder } from '../utility';

export interface IDiscoveryService extends IAbstractService {
  readonly nodeEnv: string;

  getMandatory<T extends string | number | boolean>(
    name: KeyConfigLiteralBuilder<NDiscoveryService.EnvsConfig, T>
  ): T;
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
  getArray<T extends string | number | boolean>(
    name: KeyConfigLiteralBuilder<NDiscoveryService.EnvsConfig, Array<T>>,
    def: Array<T>
  ): Array<T>;

  getSchemaMandatory<T extends string | number | boolean, C extends AnyObject>(
    name: KeyConfigLiteralBuilder<C, T>
  ): T;
  getSchemaString<C extends AnyObject>(
    name: KeyConfigLiteralBuilder<C, string>,
    def: string
  ): string;
  getSchemaNumber<C extends AnyObject>(
    name: KeyConfigLiteralBuilder<C, number>,
    def: number
  ): number;
  getSchemaBoolean<C extends AnyObject>(
    name: KeyConfigLiteralBuilder<C, boolean>,
    def: boolean
  ): boolean;
  getSchemaArray<T extends string | number | boolean, C extends AnyObject>(
    name: KeyConfigLiteralBuilder<C, Array<T>>,
    def: Array<T>
  ): Array<T>;
}

export namespace NDiscoveryService {
  export type EnvsConfig = {
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
      auth: {
        checkAccessDiff: number;
      };
    };
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
