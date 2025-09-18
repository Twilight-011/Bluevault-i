
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
import { ArrowUpRight, Building, Leaf } from 'lucide-react';
import Link from 'next/link';
import { placeholderImages } from '@/lib/placeholder-images';

const companies = [
  {
    name: 'Eco Corp.',
    industry: 'Technology',
    description: 'A global leader in software solutions, committed to achieving carbon neutrality by 2030 through strategic partnerships and green initiatives.',
    avatarId: 'avatar-3',
    totalOffset: 750,
    portfolioSlug: '/dashboard/company' 
  },
  {
    name: 'GreenShift Energy',
    industry: 'Renewable Energy',
    description: 'Pioneering sustainable energy solutions for a cleaner planet. Our investment in carbon credits is a core part of our mission.',
    avatarId: 'avatar-7',
    totalOffset: 1200,
    portfolioSlug: '/dashboard/company'
  },
  {
    name: 'AquaPure Logistics',
    industry: 'Supply Chain',
    description: 'Revolutionizing logistics with a focus on reducing emissions. We partner with environmental projects to offset our operational footprint.',
    avatarId: 'avatar-8',
    totalOffset: 500,
    portfolioSlug: '/dashboard/company'
  },
  {
    name: 'Innovate Apparel',
    industry: 'Fashion & Retail',
    description: 'Creating sustainable fashion for the conscious consumer. We are dedicated to a transparent and eco-friendly supply chain.',
    avatarId: 'avatar-9',
    totalOffset: 350,
    portfolioSlug: '/dashboard/company'
  }
];


export default function CompaniesPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <Building /> Verified Companies
          </CardTitle>
          <CardDescription>
            A directory of corporate partners committed to sustainability through BlueVault.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => {
            const avatar = placeholderImages.find(p => p.id === company.avatarId);
            return (
          <Card key={company.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                   {avatar && <AvatarImage src={avatar.imageUrl} alt={company.name} data-ai-hint={avatar.imageHint} />}
                  <AvatarFallback>
                    {company.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{company.name}</CardTitle>
                  <CardDescription>{company.industry}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{company.description}</p>
              <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50">
                <Leaf className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">
                  Total Offset: {company.totalOffset.toLocaleString()} tCO₂e
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href={company.portfolioSlug}>
                  View Portfolio <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        )})}
      </div>
    </div>
  );
}

