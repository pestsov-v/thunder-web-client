import { setService } from '../edge/src';
import { testCollector } from './test/test.collector';

export const entry = setService('Entry', [testCollector], {});
