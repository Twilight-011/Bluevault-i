
'use client'
import { CarbonCreditMarket } from '@/components/marketplace/carbon-credit-market';
import { useState, useEffect } from 'react';

export default function CompanyDashboard() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('userRole');
      setRole(storedRole);
    }
  }, []);


  return (
    <div className="grid gap-8">
        <CarbonCreditMarket role={role} />
    </div>
  );
}
