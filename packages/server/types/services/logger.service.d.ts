import { IAbstractService } from './abstract.service';

export interface ILoggerService extends IAbstractService {
  error(): void;
}

export namespace NLoggerService {}
