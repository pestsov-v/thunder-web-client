import './globals.css';
import { AppProps } from 'next/app';
import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { IInitiator } from '@Edge/Types';

export default function MyApp(props: AppProps) {
  container.get<IInitiator>(EdgeSymbols.Initiator).start();

  return <props.Component {...props.pageProps} />;
}
