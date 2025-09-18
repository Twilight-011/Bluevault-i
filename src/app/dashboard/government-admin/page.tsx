
'use client';
import { ReportGenerator } from '@/components/mrv/report-generator';
import { CarbonCreditMarket } from '@/components/marketplace/carbon-credit-market';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building, Users, HardHat, Leaf } from 'lucide-react';

function StatCard({ icon: Icon, label, value, unit }: {icon: React.ElementType, label: string, value: string, unit: string}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{unit}</p>
            </CardContent>
        </Card>
    )
}

export default function GovernmentAdminDashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      setRole(storedRole);
    }
  }, []);

  return (
    <div className="grid gap-8">
        <Card>
            <CardHeader>
                <CardTitle>Ecosystem Overview</CardTitle>
            </CardHeader>
             <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Leaf} label="Total Projects" value="6" unit="Active" />
                <StatCard icon={Users} label="Registered NGOs" value="4" unit="Organizations" />
                <StatCard icon={HardHat} label="Field Officers" value="85" unit="Active Personnel" />
                <StatCard icon={Building} label="Partner Companies" value="12" unit="Investors" />
            </CardContent>
        </Card>
        <ReportGenerator />
        <CarbonCreditMarket role={role} />
    </div>
  );
}
