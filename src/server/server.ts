import { container } from '@Server/Container';
import { IInitiator } from '@Server/Types';
import { ServerSymbols } from '@Server/Symbols';

const initiator = container.get<IInitiator>(ServerSymbols.Initiator);

const initiate = async () => {
  await initiator.start();
};

const terminate = async () => {
  await initiator.stop();
  process.removeAllListeners();
  process.exit(0);
};

process.on('SIGTERM', terminate);
process.on('SIGINT', terminate);
process.on('SIGHUP', terminate);
process.on('uncaughtException', (e) => {
  console.error(e);
  initiator.stop().then(() => {
    process.exit(1);
  });
});
process.on('unhandledRejection', (reason, parameter) => {
  parameter.catch((e) => {
    console.error(e);
    initiator.stop().then(() => {
      process.exit(1);
    });
  });
});

initiate().catch((e) => {
  console.log('Server end with error: ', e);
});
