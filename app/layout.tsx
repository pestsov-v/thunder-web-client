import React from 'react';
import { setServices, setService } from '../packages/edge/dist';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const TestService = setService({
    service: 'SysLoacla',
    domains: [],
  });

  setServices([TestService]);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
