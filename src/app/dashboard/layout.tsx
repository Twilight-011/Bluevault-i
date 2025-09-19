import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { DashboardClientLayout } from '@/components/dashboard/dashboard-client-layout';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen flex-col bg-muted/40 lg:grid lg:grid-cols-[1fr]">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-foreground"
        >
          <div className="group flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
            <Leaf className="h-4 w-4 transition-all group-hover:scale-110" />
          </div>
          <span className="font-bold text-lg">BlueVault</span>
        </Link>
        <DashboardClientLayout>
            {null}
        </DashboardClientLayout>
      </header>
      <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8">
        {children}
      </main>
    </div>
  );
}
