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
import { ArrowUpRight, Siren, Users, Leaf, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { useAlerts } from '@/context/alert-context';
import { formatDistanceToNow } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PostCreator } from '@/components/field-officer/post-creator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images';

const farmers = [
  { name: 'Anjali Sharma', location: 'Sunderbans Sector 4B', avatarId: 'avatar-4' },
  { name: 'Vikram Singh', location: 'Mahanadi Delta', avatarId: 'avatar-5' },
  { name: 'Priya Patel', location: 'Pichavaram Forest', avatarId: 'avatar-6' },
];

export default function NgoManagerDashboard() {
  const { alerts, clearAlerts } = useAlerts();

  return (
    <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 grid auto-rows-max gap-8">
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
                    <CardTitle className="flex items-center gap-2"><Leaf /> Project Portfolio</CardTitle>
                    <CardDescription>Overview of your organization's projects.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold">Sunderbans Restoration</h3>
                        <p className="text-sm text-muted-foreground">Generated 5,000 tCO2e</p>
                        <Button variant="link" size="sm" className="px-0" asChild>
                            <Link href="/dashboard/project/sunderbans-restoration">
                                View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                     <div className="p-4 border rounded-lg">
                        <h3 className="font-semibold">Pichavaram Initiative</h3>
                        <p className="text-sm text-muted-foreground">Generated 2,500 tCO2e</p>
                         <Button variant="link" size="sm" className="px-0" asChild>
                            <Link href="/dashboard/project/pichavaram-initiative">
                                View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button asChild className="w-full">
                        <Link href="/dashboard/mrv-report">
                            Go to MRV Reporting Tool <BarChart2 className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
        <div className="grid auto-rows-max gap-8">
            <PostCreator />
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users /> Affiliated Farmers</CardTitle>
                    <CardDescription>Field officers and local partners.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-64">
                        <div className="space-y-4">
                            {farmers.map(farmer => {
                                const avatar = placeholderImages.find(p => p.id === farmer.avatarId);
                                return (
                                    <div key={farmer.name} className="flex items-center gap-4">
                                        <Avatar>
                                            {avatar && <AvatarImage src={avatar.imageUrl} alt={farmer.name} data-ai-hint={avatar.imageHint} />}
                                            <AvatarFallback>{farmer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{farmer.name}</p>
                                            <p className="text-sm text-muted-foreground">{farmer.location}</p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
