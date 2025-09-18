import { ReportGenerator } from '@/components/mrv/report-generator';
import { CarbonCreditMarket } from '@/components/marketplace/carbon-credit-market';
import SocialFeed from '@/components/dashboard/social-feed';

export default function GovernmentAdminDashboard() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
       <div className="lg:col-span-2 grid auto-rows-max gap-8">
        <ReportGenerator />
        <CarbonCreditMarket />
      </div>
       <div className="grid auto-rows-max gap-8">
        <SocialFeed />
      </div>
    </div>
  );
}
