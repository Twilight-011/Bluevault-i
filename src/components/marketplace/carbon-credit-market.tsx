'use client';
import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, Minus, Store, TrendingUp } from 'lucide-react';
import Link from 'next/link';

type Credit = {
  project: string;
  slug: string;
  location: string;
  price: number;
  healthScore: number;
  available: number;
  trend: 'up' | 'down' | 'stable';
};

const initialCredits: Credit[] = [
  {
    project: 'Sunderbans Restoration',
    slug: 'sunderbans-restoration',
    location: 'West Bengal, IN',
    price: 25.5,
    healthScore: 92,
    available: 5000,
    trend: 'up',
  },
  {
    project: 'Mahanadi Delta Project',
    slug: 'mahanadi-delta-project',
    location: 'Odisha, IN',
    price: 18.75,
    healthScore: 85,
    available: 12000,
    trend: 'stable',
  },
  {
    project: 'Pichavaram Initiative',
    slug: 'pichavaram-initiative',
    location: 'Tamil Nadu, IN',
    price: 32.1,
    healthScore: 95,
    available: 2500,
    trend: 'up',
  },
  {
    project: 'Godavari Estuary Greens',
    slug: 'godavari-estuary-greens',
    location: 'Andhra Pradesh, IN',
    price: 21.0,
    healthScore: 78,
    available: 8000,
    trend: 'down',
  },
    {
    project: 'Krishna Mangrove Regeneration',
    slug: 'krishna-mangrove-regeneration',
    location: 'Andhra Pradesh, IN',
    price: 23.50,
    healthScore: 90,
    available: 6500,
    trend: 'up',
  },
    {
    project: 'Mumbai Coastal Protection',
    slug: 'mumbai-coastal-protection',
    location: 'Maharashtra, IN',
    price: 28.00,
    healthScore: 88,
    available: 3000,
    trend: 'stable',
  },
];

const HealthBadge = ({ score }: { score: number }) => {
  let variant: 'default' | 'secondary' | 'destructive' = 'default';
  if (score < 80) variant = 'destructive';
  if (score >= 80 && score < 90) variant = 'secondary';
  return (
    <Badge variant={variant} className="w-[50px] flex justify-center">{score}</Badge>
  );
};

const TrendIcon = ({ trend }: { trend: 'up' | 'down' | 'stable' }) => {
  if (trend === 'up') return <ArrowUp className="h-4 w-4 text-green-500" />;
  if (trend === 'down') return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
};

export function CarbonCreditMarket() {
  const [credits, setCredits] = useState<Credit[]>(initialCredits);

  useEffect(() => {
    const interval = setInterval(() => {
      setCredits((prevCredits) =>
        prevCredits.map((credit) => {
          const change = (Math.random() - 0.5) * 0.5;
          const newPrice = Math.max(10, credit.price + change);
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
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Store className="h-6 w-6" /> Carbon Credit Marketplace
        </CardTitle>
        <CardDescription>
          Invest in verified carbon credits from mangrove restoration projects.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="text-center">Health</TableHead>
              <TableHead className="text-right">Price (USD)</TableHead>
              <TableHead className="text-right">Available (tCO2e)</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {credits.map((credit) => (
              <TableRow key={credit.project}>
                <TableCell>
                  <Link href={`/dashboard/project/${credit.slug}`} className="hover:underline">
                    <div className="font-medium">{credit.project}</div>
                  </Link>
                  <div className="text-sm text-muted-foreground">
                    {credit.location}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <HealthBadge score={credit.healthScore} />
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <TrendIcon trend={credit.trend} />
                    <span>${credit.price.toFixed(2)}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {credit.available.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <Button size="sm" variant="outline">
                    <TrendingUp className="mr-2 h-4 w-4"/>
                    Trade
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
