import { CarbonCreditMarket } from '@/components/marketplace/carbon-credit-market';
import { HealthOverview } from '@/components/project-health/health-overview';
import SocialFeed from '@/components/dashboard/social-feed';

export default function CompanyDashboard() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-max gap-8">
        <CarbonCreditMarket />
        <HealthOverview />
      </div>
      <div className="grid auto-rows-max gap-8">
        <SocialFeed />
      </div>
    </div>
  );
}
