import { injectable, inject, jwt } from '~packages';
import { container } from '~container';
import { CoreSymbols } from '~symbols';
import { AbstractService } from './abstract.service';
import { Guards } from '../utils';

import type {
  IAuthService,
  IDiscoveryService,
  ISchemaService,
  IStorageStrategy,
  NAuthService,
  NSessionService,
} from '~types';

@injectable()
export class AuthService extends AbstractService implements IAuthService {
  protected _SERVICE_NAME = AuthService.name;
  private _CONFIG: NAuthService.Config | undefined;

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
      checkAccessDiff: this._discoveryService.getNumber('services.auth.checkAccessDiff', 30),
    };
  }

  private get _config(): NAuthService.Config {
    if (!this._CONFIG) {
      throw new Error('Configuration not set. ');
    }

    return this._CONFIG;
  }

  protected init(): boolean {
    this._setConfig();

    return true;
  }

  protected destroy(): void {
    this._CONFIG = undefined;
  }

  public get userTokens(): NAuthService.Tokens {
    return this._getTokens('user');
  }

  public get orgTokens(): NAuthService.Tokens {
    return this._getTokens('org');
  }

  private _getTokens(type: 'user' | 'org'): NAuthService.Tokens {
    const tokens: {
      access: NAuthService.AuthTokens;
      refresh: NAuthService.AuthTokens;
    } = {
      access: type === 'user' ? 'x-organization-access-token' : 'x-user-access-token',
      refresh: type === 'org' ? 'x-organization-refresh-token' : 'x-user-refresh-token',
    };

    const storage = container.get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy);

    if (this._checkAuthExp(tokens.access)) {
      return {
        status: 'access:actual',
        access: storage.getString(tokens.access, ''),
      };
    } else {
      if (this._checkAuthExp(tokens.refresh)) {
        return {
          status: 'access:expired',
          refresh: storage.getString(tokens.refresh, ''),
        };
      } else {
        return {
          status: 'refresh:expired',
        };
      }
    }
  }

  public getUserJWTPayload<
    T extends NSessionService.SessionIdentifiers = NSessionService.SessionIdentifiers,
  >(): NAuthService.AuthJWTPayload<T> {
    return this._getJWTPayload('user');
  }

  public getOrgJWTPayload<
    T extends NSessionService.OrganizationIdentifiers = NSessionService.OrganizationIdentifiers,
  >(): NAuthService.AuthJWTPayload<T> {
    return this._getJWTPayload('org');
  }

  private _getJWTPayload<
    P extends NSessionService.SessionIdentifiers | NSessionService.OrganizationIdentifiers,
    T extends 'user' | 'org',
  >(type: T): NAuthService.AuthJWTPayload<P> {
    const tokens: {
      access: NAuthService.AuthTokens;
      refresh: NAuthService.AuthTokens;
    } = {
      access: type === 'user' ? 'x-organization-access-token' : 'x-user-access-token',
      refresh: type === 'org' ? 'x-organization-refresh-token' : 'x-user-refresh-token',
    };

    if (this._checkAuthExp(tokens.access)) {
      const accessToken = container
        .get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
        .getString(tokens.access, '');

      if (accessToken.length > 0) {
        const { payload } = this._decodeJWT<P>(accessToken);

        return { payload };
      } else {
        const refreshToken = container
          .get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
          .getString(tokens.refresh, '');

        if (refreshToken.length > 0) {
          const { payload } = this._decodeJWT<P>(refreshToken);

          return { payload };
        } else {
          // TODO: resolve refresh expired root handler
          throw new Error('TODO: resolve refresh expired root handler');
        }
      }
    } else {
      if (this._checkAuthExp(tokens.refresh)) {
        const token = container
          .get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
          .getString(tokens.refresh, '');

        if (token.length > 0) {
          const { payload } = this._decodeJWT<P>(token);

          return { payload };
        } else {
          // TODO: resolve refresh expired root handler
          throw new Error('TODO: resolve refresh expired root handler');
        }
      } else {
        // TODO: resolve refresh expired root handler
        throw new Error('TODO: resolve refresh expired root handler');
      }
    }
  }

  public setUserAuthJWTPayload(access: string, refresh: string): void {
    const storage = container.get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy);

    storage.setItem<string>('x-user-access-token', access);
    storage.setItem<string>('x-user-refresh-token', refresh);
  }

  public updateUserAccessToken(token: string): void {
    container
      .get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
      .setItem<string>('x-user-access-token', token);
  }

  public updateOrgAccessToken(token: string): void {
    container
      .get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
      .setItem<string>('x-organization-access-token', token);
  }

  public setOrgAuthJWTPayload(access: string, refresh: string): void {
    const storage = container.get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy);

    storage.setItem<string>('x-organization-access-token', access);
    storage.setItem<string>('x-organization-refresh-token', refresh);
  }

  public resolveUserAccessExp(): NAuthService.AuthStage {
    const storage = container.get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy);

    if (this._checkAuthExp('x-user-access-token')) {
      return {
        status: 'access:actual',
        token: storage.getString('x-user-access-token', ''),
      };
    } else {
      if (this._checkAuthExp('x-user-refresh-token')) {
        return {
          status: 'access:expired',
          token: storage.getString('x-user-refresh-token', ''),
        };
      } else {
        return {
          status: 'refresh:expired',
        };
      }
    }
  }

  public resolveOrgAccessExp(): NAuthService.AuthStage {
    const storage = container.get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy);

    if (this._checkAuthExp('x-organization-access-token')) {
      return {
        status: 'access:actual',
        token: storage.getString('x-organization-access-token', ''),
      };
    } else {
      if (this._checkAuthExp('x-organization-refresh-token')) {
        return {
          status: 'access:expired',
          token: storage.getString('x-organization-refresh-token', ''),
        };
      } else {
        return {
          status: 'refresh:expired',
        };
      }
    }
  }

  private _checkAuthExp(type: NAuthService.AuthTokens): boolean {
    const token = container
      .get<IStorageStrategy>(CoreSymbols.LocalStorageStrategy)
      .getString(type, '');

    if (token.length > 0) {
      const { exp } = this._decodeJWT(token);
      const current = Math.round(Date.now() / 1000);
      const diff = exp - (current + this._config.checkAccessDiff);

      return diff < 0;
    } else {
      return false;
    }
  }

  private _decodeJWT<T>(token: string): { exp: number; iat: number; diff: number; payload: T } {
    const payload = jwt.decode<NAuthService.JwtAuthStructure>(token);

    if (!Guards.isJwtAuthPayload(payload)) {
      throw new Error('JWt token has invalid structure. ');
    }

    return {
      exp: payload.exp,
      iat: payload.iat,
      diff: payload.exp - payload.iat,
      payload: payload.payload as T,
    };
  }
}
