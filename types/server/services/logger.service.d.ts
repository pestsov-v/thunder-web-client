import { IAbstractService } from '@Server/Types';

export interface ILoggerService extends IAbstractService {
  error(): void;
}

export namespace NLoggerService {}
