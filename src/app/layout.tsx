import type { Metadata } from 'next';
import { Layout } from '@/components/Layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'FreshCart - Online Grocery Store',
  description: 'Shop fresh groceries online with FreshCart. Quality products delivered to your doorstep.',
  keywords: 'grocery, online shopping, fresh produce, dairy, meat, bakery',
  authors: [{ name: 'FreshCart Team' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75'>🛒</text></svg>" />
      </head>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
