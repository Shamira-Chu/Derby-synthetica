import React from 'react';
import type { Metadata, Viewport } from 'next';
import { AppShell } from '@/components/layout/AppShell';
import './globals.css';

const DESCRICAO =
  'Portal editorial do flat track roller derby na temporada 2047: tática, equipamento, arbitragem assistida, transmissão e a cultura da pista.';

export const metadata: Metadata = {
  title: 'DERBY SYNTHETICA',
  description: DESCRICAO,
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'DERBY SYNTHETICA | Temporada 2047.',
    description: DESCRICAO,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-black text-ink antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
