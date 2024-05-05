import type { IAbstractService } from './abstract.service';
import { NSessionService } from './session.service';

export interface IAuthService extends IAbstractService {
  readonly userTokens: NAuthService.Tokens;

  getJWTPayload<
    T extends NSessionService.SessionIdentifiers = NSessionService.SessionIdentifiers,
  >(): NAuthService.AuthJWTPayload<T>;
  setJWTPayload(access: string, refresh: string): void;
  resolveAccessExp(): NAuthService.AuthStage;
  updateAccessToken(token: string): void;
}

export namespace NAuthService {
  export type Config = {
    checkAccessDiff: number;
  };

  export type AuthStatus = 'access:actual' | 'access:expired' | 'refresh:expired';

  export type AuthTokens =
    | 'x-user-access-token'
    | 'x-user-refresh-token'
    | 'x-organization-access-token'
    | 'x-organization-refresh-token';

  export interface BaseAuthScope {
    status: AuthStatus;
  }
  export interface AccessActualAuthScope extends BaseAuthScope {
    status: 'access:actual';
    token: string;
  }
  export interface AccessExpiredAuthScope extends BaseAuthScope {
    status: 'access:expired';
    token: string;
  }

  export interface RefreshExpiredAuthScope extends BaseAuthScope {
    status: 'refresh:expired';
  }
  export type AuthStage = AccessActualAuthScope | AccessExpiredAuthScope | RefreshExpiredAuthScope;

  export type AuthJWTPayload<T> = { payload: P };

  export interface ActualAccessTokens extends BaseAuthScope {
    status: 'access:actual';
    access: string;
  }

  export interface AccessExpiredTokens extends BaseAuthScope {
    status: 'access:expired';
    refresh: string;
  }

  export interface RefreshExpiredTokens extends BaseAuthScope {
    status: 'refresh:expired';
  }

  export type Tokens = ActualAccessTokens | AccessExpiredTokens | RefreshExpiredTokens;

  export type JwtAuthStructure<T> = {
    exp: number;
    iat: number;
    jti: string;
    payload: T;
  };
}
