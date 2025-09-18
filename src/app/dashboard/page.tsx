import SocialFeed from '@/components/dashboard/social-feed';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-max gap-8">
        <Card className="shadow-lg">
           <CardHeader>
            <CardTitle className="font-headline text-3xl">Welcome to BlueVault</CardTitle>
            <CardDescription>Your all-in-one platform for mangrove conservation and carbon credit management.</CardDescription>
           </CardHeader>
           <CardContent>
            <p className="text-muted-foreground">Select a dashboard from the navigation to manage your role-specific tasks, or check out the latest project updates from the community in the social feed.</p>
           </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max gap-8">
        <SocialFeed />
      </div>
    </div>
  );
}
