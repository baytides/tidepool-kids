import type { Metadata } from 'next';
import { nunito, fredoka } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tidepool Kids - Explore the Bay Area',
  description: 'An interactive map for kids to explore San Francisco Bay Area nature and community.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${nunito.variable} ${fredoka.variable}`}>
      <body>{children}</body>
    </html>
  );
}
