'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Siren } from 'lucide-react';
import Link from 'next/link';
import { useAlerts } from '@/context/alert-context';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import SocialFeed from '@/components/dashboard/social-feed';
import { HealthOverview } from '@/components/project-health/health-overview';

export default function NgoManagerDashboard() {
  const { alerts, clearAlerts } = useAlerts();

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-max gap-8">
        <HealthOverview />
      </div>

      <div className="grid auto-rows-max gap-8">
        <Card className="shadow-lg bg-destructive/90 text-destructive-foreground">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Siren /> Emergency Monitor
            </CardTitle>
            <CardDescription className="text-destructive-foreground/80">
              Live alerts from field officers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-40">
              {alerts.length > 0 ? (
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-lg bg-destructive">
                      <p className="font-semibold">{alert.message}</p>
                      <p className="text-sm text-destructive-foreground/80">
                        {alert.location} -{' '}
                        {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p>No active emergencies.</p>
                </div>
              )}
            </ScrollArea>
          </CardContent>
          {alerts.length > 0 && (
            <CardFooter>
              <Button variant="secondary" onClick={clearAlerts} className="w-full">
                Clear All Alerts
              </Button>
            </CardFooter>
          )}
        </Card>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>MRV Report Generation</CardTitle>
            <CardDescription>
              Use AI to generate dynamic Monitoring, Reporting, and Verification reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analyze project data and NGO efforts to create comprehensive reports for stakeholders.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/dashboard/mrv-report">
                Go to Report Tool <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <SocialFeed />
      </div>
    </div>
  );
}
