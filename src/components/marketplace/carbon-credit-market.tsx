
'use client';
import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpRight, Minus, Store, Leaf, Calendar, Star, ShieldCheck, ShoppingCart, Info } from 'lucide-react';
import Link from 'next/link';
import { BuyCreditsDialog } from './buy-credits-dialog';

type Credit = {
  project: string;
  slug: string;
  location: string;
  price: number;
  healthScore: number;
  available: number;
  trend: 'up' | 'down' | 'stable';
  vintage: number;
  standard: 'VCS' | 'Gold Standard';
  rating: number;
  seller: string;
  type: 'Blue Carbon' | 'Forest';
};

const initialCredits: Credit[] = [
  {
    project: 'Sunderbans Restoration',
    slug: 'sunderbans-restoration',
    location: 'West Bengal, IN',
    price: 2116.5,
    healthScore: 92,
    available: 5000,
    trend: 'up',
    vintage: 2024,
    standard: 'VCS',
    rating: 4.8,
    seller: 'Ocean Foundation',
    type: 'Blue Carbon'
  },
  {
    project: 'Mahanadi Delta Project',
    slug: 'mahanadi-delta-project',
    location: 'Odisha, IN',
    price: 1556.25,
    healthScore: 85,
    available: 12000,
    trend: 'stable',
    vintage: 2023,
    standard: 'VCS',
    rating: 4.4,
    seller: 'Amazon Trust',
    type: 'Forest'
  },
  {
    project: 'Pichavaram Initiative',
    slug: 'pichavaram-initiative',
    location: 'Tamil Nadu, IN',
    price: 2664.3,
    healthScore: 95,
    available: 2500,
    trend: 'up',
    vintage: 2024,
    standard: 'Gold Standard',
    rating: 4.6,
    seller: 'EcoRestore Ltd',
    type: 'Blue Carbon'
  },
   {
    project: 'Godavari Estuary Greens',
    slug: 'godavari-estuary-greens',
    location: 'Andhra Pradesh, IN',
    price: 1743.0,
    healthScore: 78,
    available: 8000,
    trend: 'down',
    vintage: 2023,
    standard: 'VCS',
    rating: 4.2,
    seller: 'GreenWave Org',
    type: 'Blue Carbon'
  },
    {
    project: 'Krishna Mangrove Regeneration',
    slug: 'krishna-mangrove-regeneration',
    location: 'Andhra Pradesh, IN',
    price: 1950.50,
    healthScore: 90,
    available: 6500,
    trend: 'up',
    vintage: 2024,
    standard: 'Gold Standard',
    rating: 4.7,
    seller: 'Delta Conservation',
    type: 'Blue Carbon'
  },
    {
    project: 'Mumbai Coastal Protection',
    slug: 'mumbai-coastal-protection',
    location: 'Maharashtra, IN',
    price: 2324.00,
    healthScore: 88,
    available: 3000,
    trend: 'stable',
    vintage: 2023,
    standard: 'VCS',
    rating: 4.5,
    seller: 'Urban Oasis',
    type: 'Forest'
  },
];


const TrendIcon = ({ trend, percentage }: { trend: 'up' | 'down' | 'stable', percentage: number }) => {
  const color = trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-muted-foreground';
  const icon = trend === 'up' ? <ArrowUp className="h-4 w-4" /> : trend === 'down' ? <ArrowDown className="h-4 w-4" /> : <Minus className="h-4 w-4" />;
  return (
    <div className={`flex items-center text-sm ${color}`}>
        {icon}
        <span>{percentage.toFixed(2)}%</span>
    </div>
  );
};

const RatingStars = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => <Star key={`full-${i}`} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
            {halfStar && <Star key="half" className="w-4 h-4 text-yellow-400" />}
            {[...Array(emptyStars)].map((_, i) => <Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)}
        </div>
    );
};

function CreditCard({ credit, role }: { credit: Credit, role: string | null}) {
    const [percentage, setPercentage] = useState( (Math.random() * 5));

    return (
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                         <div className="bg-accent p-2 rounded-lg">
                            <Leaf className="h-6 w-6 text-primary"/>
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold">{credit.project}</CardTitle>
                            <p className="text-sm text-muted-foreground">{credit.location}</p>
                        </div>
                    </div>
                    <Badge variant={credit.type === 'Blue Carbon' ? 'default' : 'secondary'}>{credit.type}</Badge>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-6">
                <div className="flex justify-between items-center p-4 rounded-lg bg-accent/50">
                    <div>
                        <p className="text-sm text-muted-foreground">Price per Credit</p>
                        <p className="text-2xl font-bold">{credit.price.toFixed(2)}</p>
                    </div>
                     <TrendIcon trend={credit.trend} percentage={percentage} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground"><Leaf className="h-4 w-4"/><span>Available</span></div>
                        <p className="font-semibold">{credit.available.toLocaleString()} credits</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground"><Calendar className="h-4 w-4"/><span>Vintage</span></div>
                        <p className="font-semibold">{credit.vintage}</p>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground"><Star className="h-4 w-4"/><span>Rating</span></div>
                        <div className="flex items-center gap-1">
                            <p className="font-semibold">{credit.rating.toFixed(1)}</p>
                            <RatingStars rating={credit.rating} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="h-4 w-4"/><span>Standard</span></div>
                        <p className="font-semibold">{credit.standard}</p>
                    </div>
                </div>

                <div className="border-t pt-4">
                     <p className="text-sm text-muted-foreground">Seller</p>
                     <div className="flex justify-between items-center">
                        <p className="font-semibold">{credit.seller}</p>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            Verified
                        </Badge>
                     </div>
                </div>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-2">
                <Button variant="outline" asChild>
                    <Link href={`/dashboard/project/${credit.slug}`}>
                        <Info className="mr-2 h-4 w-4"/> View Details
                    </Link>
                </Button>
                {role === 'company' && (
                  <BuyCreditsDialog credit={credit} />
                )}
                 {role === 'ngo-manager' && (
                    <Button variant="outline" disabled>
                        <ShoppingCart className="mr-2 h-4 w-4"/> Buy Credits
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}

export function CarbonCreditMarket({ role }: { role: string | null }) {
  const [credits, setCredits] = useState<Credit[]>(initialCredits);

  useEffect(() => {
    const interval = setInterval(() => {
      setCredits((prevCredits) =>
        prevCredits.map((credit) => {
          const change = (Math.random() - 0.5) * 20;
          const newPrice = Math.max(1000, credit.price + change);
          let newTrend: 'up' | 'down' | 'stable' = 'stable';
          if (newPrice > credit.price) newTrend = 'up';
          if (newPrice < credit.price) newTrend = 'down';

          return { ...credit, price: parseFloat(newPrice.toFixed(2)), trend: newTrend };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            Carbon Credit Marketplace
          </CardTitle>
          <CardDescription>
            Invest in verified carbon credits from mangrove restoration projects. Prices in INR.
          </CardDescription>
        </CardHeader>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credits.map((credit) => (
          <CreditCard key={credit.project} credit={credit} role={role} />
        ))}
      </div>
    </div>
  );
}
