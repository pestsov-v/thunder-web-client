import type { NSchemaService } from '../services';
import type { ServiceStructure } from '../setters';

export interface ISchemaLoader {
  readonly isDefine: boolean;
  readonly services: NSchemaService.Services;

  init(): void;
  destroy(): void;
  setBusinessLogic(services: ServiceStructure[]): void;
}
