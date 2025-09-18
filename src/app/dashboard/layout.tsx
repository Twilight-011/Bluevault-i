'use client';
import Link from 'next/link';
import {
  Bell,
  FileText,
  HardHat,
  Home,
  Leaf,
  LineChart,
  Package,
  PanelLeft,
  Settings,
  ShieldCheck,
  Store,
  Users,
  Building,
  UserCog,
  Landmark,
  Compass,
} from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { UserNav } from '@/components/dashboard/user-nav';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const allNavItems = [
   {
    role: 'dashboard',
    href: '/dashboard',
    icon: Compass,
    label: 'Explore',
  },
  {
    role: 'field-officer',
    href: '/dashboard/field-officer',
    icon: HardHat,
    label: 'Field Officer',
  },
  {
    role: 'ngo-manager',
    href: '/dashboard/ngo-manager',
    icon: Users,
    label: 'NGO Manager',
  },
  {
    role: 'stakeholder',
    href: '/dashboard/stakeholder',
    icon: ShieldCheck,
    label: 'Stakeholder',
  },
  {
    role: 'company',
    href: '/dashboard/company',
    icon: Building,
    label: 'Company',
  },
  {
    role: 'government-admin',
    href: '/dashboard/government-admin',
    icon: Landmark,
    label: 'Government/Admin',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toast } = useToast();
  const role = pathname.split('/')[2] || 'dashboard';

  const handleNavClick = (e: React.MouseEvent, targetRole: string) => {
    // Allow navigation to explore page
    if (targetRole === 'dashboard') return;

    if (role && targetRole !== role) {
      e.preventDefault();
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: `You must have the '${targetRole.replace('-', ' ')}' role to access this section.`,
      });
    }
  };

  const navItems = role ? allNavItems.filter(item => item.role === role || item.role === 'dashboard') : allNavItems;


  const getBreadcrumb = () => {
    const parts = pathname.split('/').filter(Boolean);
    if (parts.length === 1 && parts[0] === 'dashboard') {
       return (
        <BreadcrumbItem>
            <BreadcrumbPage>Explore</BreadcrumbPage>
        </BreadcrumbItem>
       )
    }
    if (parts.length > 1) {
      const currentItem = allNavItems.find(item => item.href === `/${parts.join('/')}`);
      return (
        <>
          <BreadcrumbItem>
             <BreadcrumbLink asChild>
                <Link href={`/dashboard`}>Explore</Link>
             </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="capitalize font-medium">
              {currentItem?.label || parts[1].replace('-', ' ')}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Leaf className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">BlueVault</span>
            </Link>
            {navItems.map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.role)}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8 ${
                      pathname === item.href
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </aside>
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-card px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/dashboard"
                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                  >
                    <Leaf className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">BlueVault</span>
                  </Link>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        handleNavClick(e, item.role);
                        const trigger = document.querySelector('[data-radix-collection-item] > button');
                        if (trigger instanceof HTMLElement) {
                            trigger.click();
                        }
                      }}
                      className={`flex items-center gap-4 px-2.5 ${
                        pathname.startsWith(item.href)
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                {getBreadcrumb()}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="relative ml-auto flex-1 md:grow-0" />
            <UserNav />
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
