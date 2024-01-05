import 'reflect-metadata';
import { Container } from '@Edge/Package';
import { EdgeModule } from './ioc.edge.module';

const container = new Container();
container.load(EdgeModule);
export { container };
