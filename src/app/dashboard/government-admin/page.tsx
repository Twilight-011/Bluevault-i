
'use client';
import { ReportGenerator } from '@/components/mrv/report-generator';
import { CarbonCreditMarket } from '@/components/marketplace/carbon-credit-market';
import { useState, useEffect } from 'react';

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
        <ReportGenerator />
        <CarbonCreditMarket role={role} />
    </div>
  );
}
