import 'reflect-metadata';
import { Container } from '~package';
import { EdgeModule } from './ioc.edge.module';

const container = new Container();
container.load(EdgeModule);
export { container };
