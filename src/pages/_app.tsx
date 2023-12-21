import './globals.css';
import { AppProps } from 'next/app';
import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { IInitiator } from '@Edge/Types';

export default function MyApp(props: AppProps) {
  console.log(process.env.THE);
  container.get<IInitiator>(EdgeSymbols.Initiator).start();

  return <props.Component {...props.pageProps} />;
}
