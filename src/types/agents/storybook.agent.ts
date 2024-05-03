import { IStorybookService } from '../services';

export interface IStorybookAgent {
  readonly storage: IStorybookService['storage'];

  getStorybook: IStorybookService['getStorybook'];
  getStorybookOrThrow: IStorybookService['getStorybookOrThrow'];
  getSpace: IStorybookService['getSpace'];
  getSpaceOrThrow: IStorybookService['getSpaceOrThrow'];
  getComponent: IStorybookService['getComponent'];
  getComponentOrThrow: IStorybookService['getComponentOrThrow'];
}
