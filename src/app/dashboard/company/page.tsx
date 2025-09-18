
'use client'
import { CompanyPortfolio } from '@/components/company/company-portfolio';
import SocialFeed from '@/components/dashboard/social-feed';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function CompanyDashboard() {

  return (
    <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max gap-8">
            <CompanyPortfolio />
        </div>
        <div className="grid auto-rows-max gap-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Project News</CardTitle>
                    <CardDescription>Live updates from the projects you support.</CardDescription>
                </CardHeader>
            </Card>
            <SocialFeed />
      </div>
    </div>
  );
}
