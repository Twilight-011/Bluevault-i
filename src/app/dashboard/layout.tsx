'use client';
import Link from 'next/link';
import {
  Bell,
  PanelLeft,
  Leaf,
  HardHat,
  Users,
  Building,
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
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { UserNav } from '@/components/dashboard/user-nav';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
  // Store role in state to persist it across navigation
  const [currentRole, setCurrentRole] = useState<string | null>(null);

  useEffect(() => {
    const roleFromPath = pathname.split('/')[2];
    if (roleFromPath && roleFromPath !== 'project' && roleFromPath !== 'mrv-report') {
      setCurrentRole(roleFromPath);
    } else if (pathname === '/dashboard') {
        setCurrentRole('dashboard'); // Special case for explore
    }
  }, [pathname]);
  
  const handleNavClick = (e: React.MouseEvent, targetRole: string) => {
    if (targetRole === 'dashboard') return;
    
    // Determine the user's actual role from the full path.
    const userRole = pathname.split('/')[2];

    if (userRole && userRole !== 'project' && userRole !== 'mrv-report' && userRole !== targetRole) {
      e.preventDefault();
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: `You are logged in as a '${userRole.replace('-', ' ')}'. You cannot access the '${targetRole.replace('-', ' ')}' dashboard.`,
      });
    }
  };

  const navItems = currentRole ? allNavItems.filter(item => {
    // if a role is set (e.g. field-officer), show 'Explore' and that role's dashboard link
    if (currentRole !== 'dashboard') {
       return item.role === 'dashboard' || item.role === currentRole;
    }
    // if we are on explore page, show all roles to allow selection
    return true;
  }) : allNavItems;


  const getBreadcrumb = () => {
    const parts = pathname.split('/').filter(Boolean);
    const isExplorePage = parts.length === 1 && parts[0] === 'dashboard';

    let currentPageLabel = '';
    const roleFromPath = parts.includes('field-officer') ? 'field-officer' :
                         parts.includes('ngo-manager') ? 'ngo-manager' :
                         parts.includes('company') ? 'company' :
                         parts.includes('government-admin') ? 'government-admin' : null;

    if (isExplorePage) {
       return (
        <BreadcrumbItem>
            <BreadcrumbPage>Explore</BreadcrumbPage>
        </BreadcrumbItem>
       )
    }

    const currentPage = allNavItems.find(item => item.href === pathname);

    if (roleFromPath) {
        const roleItem = allNavItems.find(item => item.role === roleFromPath);
        if (roleItem) {
            currentPageLabel = roleItem.label;
        }
    }


    return (
      <>
        <BreadcrumbItem>
           <BreadcrumbLink asChild>
              <Link href={`/dashboard`}>Explore</Link>
           </BreadcrumbLink>
        </BreadcrumbItem>
        {currentPageLabel && <BreadcrumbSeparator />}
        {currentPageLabel && (
          <BreadcrumbItem>
             {pathname.includes('/project/') || pathname.includes('/mrv-report') ? (
                <BreadcrumbLink asChild>
                    <Link href={`/dashboard/${roleFromPath}`}>{currentPageLabel}</Link>
                </BreadcrumbLink>
             ) : (
                <BreadcrumbPage className="capitalize font-medium">
                    {currentPageLabel}
                </BreadcrumbPage>
             )}
          </BreadcrumbItem>
        )}
         {(!currentPage && parts.length > 2 && !pathname.startsWith('/dashboard/project')) && <BreadcrumbSeparator />}
         {(!currentPage && parts.length > 2 && !pathname.startsWith('/dashboard/project')) && (
            <BreadcrumbItem>
                <BreadcrumbPage className="capitalize font-medium">
                    {parts[parts.length-1].replace(/-/g, ' ')}
                </BreadcrumbPage>
            </BreadcrumbItem>
         )}
          {pathname.startsWith('/dashboard/project') && parts.length > 2 && <BreadcrumbSeparator />}
          {pathname.startsWith('/dashboard/project') && parts.length > 2 && (
             <BreadcrumbItem>
                <BreadcrumbPage className="capitalize font-medium">
                    {parts[parts.length -1].replace(/-/g, ' ')}
                </BreadcrumbPage>
            </BreadcrumbItem>
          )}
      </>
    );
  };

  return (
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
            <Link
              href="/dashboard"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Leaf className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">BlueVault</span>
            </Link>

             <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
               {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.role)}
                    className={cn(`transition-colors hover:text-foreground`,
                       pathname.startsWith(item.href) && item.href !== '/dashboard' ? 'text-foreground font-semibold' : 'text-muted-foreground',
                       pathname === '/dashboard' && item.href === '/dashboard' ? 'text-foreground font-semibold' : ''
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
            </nav>


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
                      className={cn(`flex items-center gap-4 px-2.5`,
                        pathname.startsWith(item.href) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <div className="relative ml-auto flex items-center gap-4 md:grow-0">
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        {getBreadcrumb()}
                    </BreadcrumbList>
                </Breadcrumb>
                <UserNav />
            </div>

          </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8">
            {children}
        </main>
      </div>
  );
}
