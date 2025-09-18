import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AlertProvider } from '@/context/alert-context';
import { SocialFeedProvider } from '@/context/social-feed-context';
import { PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'BlueVault',
  description: 'A platform for mangrove conservation and carbon credit management.',
  icons: {
    icon: `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10zM2 13a10 10 0 0 1 10-10 9.8 9.8 0 0 1 7 3l-2.5 2.5a6 6 0 0 0-4.5-1.5 6 6 0 0 0-6 6H2z"></path></svg>')}`,
  },
};

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased', ptSans.variable)}>
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
