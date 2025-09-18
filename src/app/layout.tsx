import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AlertProvider } from '@/context/alert-context';
import { SocialFeedProvider } from '@/context/social-feed-context';

export const metadata: Metadata = {
  title: 'BlueVault',
  description: 'A platform for mangrove conservation and carbon credit management.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">
        <AlertProvider>
          <SocialFeedProvider>
            {children}
            <Toaster />
          </SocialFeedProvider>
        </AlertProvider>
      </body>
    </html>
  );
}
