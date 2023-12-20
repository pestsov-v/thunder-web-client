import { IAbstractService } from './abstract.service';

export interface ISessionService extends IAbstractService {
  readonly one: boolean;
}

export namespace NSessionService {}
