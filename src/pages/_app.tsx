import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { AppProps } from 'next/app';
import { container } from '@EdgeContainer';
import { EdgeSymbols } from '@EdgeSymbols';

import type { IInitiator } from '@Edge/Types';

export default function MyApp(props: AppProps) {
  container.get<IInitiator>(EdgeSymbols.Initiator).start();

  // TODO: set enable specific provider to config and then implement fn with result ended provider dom structure
  // TODO: and implement this structure to return arg
  return (
    <NextUIProvider>
      <props.Component {...props.pageProps} />
    </NextUIProvider>
  );
}
