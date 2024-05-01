import React from 'react';
import { setService, setServices } from '../src/src';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const TestService = setService('SysLoacla', []);
  setServices([TestService]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
