import SocialFeed from '@/components/dashboard/social-feed';

export default function Dashboard() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-max gap-8">
        {/* Main content can go here */}
        <div className="p-4 bg-card rounded-lg shadow-lg">
           <h2 className="text-2xl font-bold font-headline mb-4">Welcome to BlueVault</h2>
           <p className="text-muted-foreground">Select a dashboard from the navigation to get started, or check out the latest project updates in the social feed.</p>
        </div>
      </div>
      <div className="grid auto-rows-max gap-8">
        <SocialFeed />
      </div>
    </div>
  );
}
