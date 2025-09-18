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
