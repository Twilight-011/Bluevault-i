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
    icon: `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMxNjY1MzQiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNMjAgMTRiLTMuMzQgMy4zNCAwIDAgMC0zLjc1IDVBMi41IDIuNSAwIDAgMSAxMyAyMmgxYTkuNjIgOS42MiAwIDAgMCA4LTljLTMuMzMtMy4zNC01LTYtOCAtaiIvPjxwYXRoIGQ9Ik00IDEwYy42OS0uNDMgMS4zMi0uODMgMi0xLjQxQTEwLjIgMTAuMiAwIDAgMSA4IDZMMTAgNGwtMSA1TDQgNWwtMyA4aDZhNi4zNyA2LjM3IDAgMCAxIDEtNmwuNDEtMS41OUExMC4xIDEwLjEgMCAwIDAgNCAxMFoiLz48L3N2Zz4=`,
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
