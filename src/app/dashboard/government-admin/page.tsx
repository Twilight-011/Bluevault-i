import { HealthOverview } from '@/components/project-health/health-overview';
import SocialFeed from '@/components/dashboard/social-feed';
import { ReportGenerator } from '@/components/mrv/report-generator';

export default function GovernmentAdminDashboard() {
  return (
    <div className="grid gap-8 auto-rows-max">
        <HealthOverview />
        <ReportGenerator />
        <SocialFeed />
    </div>
  );
}
