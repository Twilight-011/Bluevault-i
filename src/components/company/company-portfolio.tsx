
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, TrendingUp, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const portfolio = {
    totalCredits: 750,
    investments: [
        {
            project: 'Sunderbans Restoration',
            slug: 'sunderbans-restoration',
            credits: 500,
            avgPrice: 2100.75,
            status: 'active'
        },
        {
            project: 'Pichavaram Initiative',
            slug: 'pichavaram-initiative',
            credits: 250,
            avgPrice: 2650.00,
            status: 'active'
        }
    ]
}

const StatusBadge = ({ status }: { status: string }) => {
    if (status === 'active') return <Badge variant="default">Active</Badge>
    return <Badge variant="secondary">{status}</Badge>
}

export function CompanyPortfolio() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Briefcase className="h-6 w-6" /> Company Portfolio
        </CardTitle>
        <CardDescription>
          An overview of your carbon credit investments.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <Card>
            <CardHeader className='pb-2'>
                <CardTitle className='text-lg'>Total Carbon Credits Owned</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-4xl font-bold">{portfolio.totalCredits.toLocaleString()} <span className="text-base font-normal text-muted-foreground">tCO₂e</span></p>
                <p className="text-sm text-muted-foreground">Offsetting your carbon footprint.</p>
            </CardContent>
        </Card>
        <div>
            <h3 className="text-lg font-semibold mb-2">Investment Breakdown</h3>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead className="text-right">Credits (tCO₂e)</TableHead>
                        <TableHead className="text-right">Avg. Price (INR)</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {portfolio.investments.map((investment) => (
                        <TableRow key={investment.project}>
                            <TableCell className="font-medium">{investment.project}</TableCell>
                            <TableCell className="text-right">{investment.credits.toLocaleString()}</TableCell>
                            <TableCell className="text-right">₹{investment.avgPrice.toFixed(2)}</TableCell>
                            <TableCell className="text-center"><StatusBadge status={investment.status} /></TableCell>
                            <TableCell className="text-right">
                                <Button variant="ghost" size="icon" asChild>
                                    <Link href={`/dashboard/project/${investment.slug}`}>
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
      </CardContent>
       <CardFooter>
            <Button className="w-full" asChild>
                <Link href="/dashboard/marketplace">
                    <TrendingUp className="mr-2 h-4 w-4" /> Go to Marketplace to Buy More Credits
                </Link>
            </Button>
      </CardFooter>
    </Card>
  );
}

