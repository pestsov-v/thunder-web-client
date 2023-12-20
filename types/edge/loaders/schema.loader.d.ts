import type { NSchemaService } from '../services';
import type { RouterStructure } from '@Vendor/Types';

export interface ISchemaLoader {
  readonly isDefine: boolean;
  readonly schema: NSchemaService.Schema;

  init(): void;
  destroy(): void;
  setDomain(name: string): void;
  setRouter(domain: string, routes: RouterStructure<string>): void;
}
