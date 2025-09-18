
'use client';
import Link from 'next/link';
import {
  Leaf,
  HardHat,
  Users,
  Building,
  Landmark,
  Compass,
  Store,
  Briefcase,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/dashboard/user-nav';
import { usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { PanelLeft } from 'lucide-react';


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
   {
    role: 'marketplace',
    href: '/dashboard/marketplace',
    icon: Store,
    label: 'Marketplace',
  },
  {
    role: 'companies',
    href: '/dashboard/companies',
    icon: Briefcase,
    label: 'Companies',
  },
  {
    role: 'ngos',
    href: '/dashboard/ngos',
    icon: Users,
    label: 'NGOs',
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { toast } = useToast();
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      setUserRole(storedRole);
    }
  }, [pathname]);

  const handleNavClick = (e: React.MouseEvent, targetRole: string) => {
    const alwaysAllowed = ['dashboard', 'marketplace', 'companies', 'ngos'];
    if (!userRole || alwaysAllowed.includes(targetRole) ) {
      return;
    }

    if (userRole !== targetRole) {
      e.preventDefault();
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: `You are logged in as a '${userRole.replace('-', ' ')}'. You cannot access the '${targetRole.replace('-', ' ')}' dashboard.`,
      });
    }
  };

  const getNavItems = () => {
    if (!userRole) {
        return allNavItems.filter(item => item.role === 'dashboard');
    }
    
    switch (userRole) {
        case 'field-officer':
            return allNavItems.filter(item => 
                ['dashboard', 'field-officer'].includes(item.role)
            );
        case 'ngo-manager':
            return allNavItems.filter(item => 
                ['dashboard', 'ngo-manager', 'marketplace', 'ngos'].includes(item.role)
            );
        case 'company':
            return allNavItems.filter(item => 
                ['dashboard', 'company', 'marketplace', 'companies'].includes(item.role)
            );
        case 'government-admin':
             return allNavItems.filter(item => 
                ['dashboard', 'government-admin', 'marketplace', 'companies', 'ngos'].includes(item.role)
            );
        default:
            return allNavItems.filter(item => item.role === 'dashboard');
    }
  }

  const navItems = getNavItems();

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
                       pathname === item.href ? 'text-foreground font-semibold' : 'text-muted-foreground'
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
                <UserNav />
            </div>

          </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-4 md:gap-8">
            {children}
        </main>
      </div>
  );
}
