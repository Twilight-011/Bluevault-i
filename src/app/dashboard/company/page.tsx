
'use client'
import { CompanyPortfolio } from '@/components/company/company-portfolio';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function CompanyDashboardContent() {
  const searchParams = useSearchParams();
  const companyName = searchParams.get('name');

  return (
    <div className="grid gap-8">
        <CompanyPortfolio companyName={companyName || 'Eco Corp.'} />
    </div>
  );
}


export default function CompanyDashboard() {
  return (
    <Suspense fallback={<div>Loading company portfolio...</div>}>
      <CompanyDashboardContent />
    </Suspense>
  )
}
