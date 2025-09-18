
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, Leaf, Users } from 'lucide-react';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';

const ngos = [
  {
    name: 'GreenFuture Foundation',
    focus: 'Reforestation & Community',
    description: 'Dedicated to restoring coastal ecosystems through community-led mangrove plantation and conservation efforts.',
    avatarId: 'avatar-1',
    totalCreditsGenerated: 58500,
    projects: ['Pichavaram Initiative', 'Godavari Estuary Greens']
  },
  {
    name: 'Coastal Guardians',
    focus: 'Biodiversity & Conservation',
    description: 'Protecting marine biodiversity by restoring and preserving vital mangrove habitats along vulnerable coastlines.',
    avatarId: 'avatar-7',
    totalCreditsGenerated: 85000,
    projects: ['Sunderbans Restoration', 'Mahanadi Delta Project']
  },
  {
    name: 'Ocean Foundation',
    focus: 'Blue Carbon Projects',
    description: 'A leading organization focused on leveraging blue carbon solutions to combat climate change and support coastal communities.',
    avatarId: 'avatar-4',
    totalCreditsGenerated: 92000,
    projects: ['Sunderbans Restoration', 'Krishna Mangrove Regeneration']
  },
  {
    name: 'Urban Oasis',
    focus: 'Urban Greening',
    description: 'Creating green spaces within urban environments, including the development and protection of urban mangrove ecosystems.',
    avatarId: 'avatar-11',
    totalCreditsGenerated: 15000,
    projects: ['Mumbai Coastal Protection']
  }
];


export default function NGOsPage() {
  return (
    <div className="space-y-8">
       <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Users /> Registered NGOs
          </CardTitle>
          <CardDescription>
            A directory of non-governmental organizations leading the charge in mangrove conservation.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ngos.map((ngo) => {
            const avatar = placeholderImages.find(p => p.id === ngo.avatarId);
            return (
          <Card key={ngo.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                   {avatar && <AvatarImage src={avatar.imageUrl} alt={ngo.name} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>
                    {ngo.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{ngo.name}</CardTitle>
                  <CardDescription>{ngo.focus}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{ngo.description}</p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                <Leaf className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">
                  Total Credits Generated: {ngo.totalCreditsGenerated.toLocaleString()} tCO₂e
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/ngo-manager">
                  View Projects <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
}
