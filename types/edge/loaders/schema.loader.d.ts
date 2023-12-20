import { NSchemaService } from '../services';

export interface ISchemaLoader {
  readonly isDefine: boolean;
  readonly schema: NSchemaService.Schema;

  init(): void;
  destroy(): void;
  setDomain(name: string): void;
}
