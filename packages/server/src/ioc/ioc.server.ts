import 'reflect-metadata';
import { Container } from '@Server/Package';
import { ServerModule } from './ioc.server.module';

const container = new Container();
container.load(ServerModule);
export { container };
