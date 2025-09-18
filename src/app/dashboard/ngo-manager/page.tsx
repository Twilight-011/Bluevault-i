
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
import { Badge } from '@/components/ui/badge';
import { ListCreditsDialog } from '@/components/ngo-manager/list-credits-dialog';

const farmers = [
    { name: 'Anjali Sharma', location: 'Sunderbans Sector 4B', avatarId: 'avatar-4' },
    { name: 'Vikram Singh', location: 'Mahanadi Delta', avatarId: 'avatar-5' },
    { name: 'Priya Patel', location: 'Pichavaram Forest', avatarId: 'avatar-6' },
    { name: 'Ravi Kumar', location: 'Godavari Estuary', avatarId: 'avatar-8' },
    { name: 'Sunita Devi', location: 'Sunderbans Sector 5A', avatarId: 'avatar-9' },
    { name: 'Deepak Ghosh', location: 'Mahanadi Delta', avatarId: 'avatar-10' },
    { name: 'Meena Iyer', location: 'Pichavaram Forest', avatarId: 'avatar-11' },
    { name: 'Karthik Reddy', location: 'Godavari Estuary', avatarId: 'avatar-2' },
    { name: 'Fatima Sheikh', location: 'Sunderbans Sector 6C', avatarId: 'avatar-3' },
    { name: 'Gopal Verma', location: 'Mahanadi Delta', avatarId: 'avatar-7' }
];

const projects = [
    { name: "Sunderbans Restoration", carbonCredits: 5000, healthScore: 92, slug: 'sunderbans-restoration' },
    { name: "Pichavaram Initiative", carbonCredits: 2500, healthScore: 95, slug: 'pichavaram-initiative' },
    { name: "Mahanadi Delta Project", carbonCredits: 12000, healthScore: 85, slug: 'mahanadi-delta-project' },
    { name: "Godavari Estuary Greens", carbonCredits: 8000, healthScore: 78, slug: 'godavari-estuary-greens' },
    { name: "Krishna Mangrove Regeneration", carbonCredits: 6500, healthScore: 90, slug: 'krishna-mangrove-regeneration' },
    { name: "Mumbai Coastal Protection", carbonCredits: 3000, healthScore: 88, slug: 'mumbai-coastal-protection' },
    { name: "Maldives Atoll Conservation", carbonCredits: 7500, healthScore: 91, slug: 'maldives-atoll-conservation' },
    { name: "Amazon Delta Initiative", carbonCredits: 25000, healthScore: 94, slug: 'amazon-delta-initiative' }
]

const HealthBadge = ({ score }: { score: number }) => {
  let variant: 'default' | 'secondary' | 'destructive' = 'default';
  if (score < 80) variant = 'destructive';
  if (score >= 80 && score < 90) variant = 'secondary';
  return (
    <Badge variant={variant} className="w-[50px] flex justify-center">{score}</Badge>
  );
};

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
                    {projects.map(project => (
                        <div key={project.name} className="p-4 border rounded-lg flex flex-col justify-between">
                           <div>
                                <h3 className="font-semibold">{project.name}</h3>
                                <p className="text-sm text-muted-foreground">Generated {project.carbonCredits.toLocaleString()} tCO₂e</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <p className="text-sm font-medium">Health:</p>
                                    <HealthBadge score={project.healthScore} />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <Button variant="link" size="sm" className="px-0 self-start" asChild>
                                    <Link href={`/dashboard/project/${project.slug}`}>
                                        View Project <ArrowUpRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>
                                <ListCreditsDialog project={project} />
                            </div>
                        </div>
                    ))}
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
                    <ScrollArea className="h-96">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                            {farmers.map(farmer => {
                                const avatar = placeholderImages.find(p => p.id === farmer.avatarId);
                                return (
                                    <div key={farmer.name} className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            {avatar && <AvatarImage src={avatar.imageUrl} alt={farmer.name} data-ai-hint={avatar.imageHint} />}
                                            <AvatarFallback>{farmer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold text-sm">{farmer.name}</p>
                                            <p className="text-xs text-muted-foreground">{farmer.location}</p>
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
