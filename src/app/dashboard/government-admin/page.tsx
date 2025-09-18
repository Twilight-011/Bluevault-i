import { ReportGenerator } from '@/components/mrv/report-generator';
import { CarbonCreditMarket } from '@/components/marketplace/carbon-credit-market';

export default function GovernmentAdminDashboard() {
  return (
    <div className="grid gap-8 auto-rows-max">
      <ReportGenerator />
      <CarbonCreditMarket />
    </div>
  );
}
