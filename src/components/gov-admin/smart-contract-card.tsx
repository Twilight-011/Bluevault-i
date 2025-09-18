
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Coins,
  Users,
  Clock,
  TrendingUp,
  FileJson,
  Gem,
} from 'lucide-react';

const OIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 text-primary-foreground"
    >
        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
    </svg>
)

interface SmartContractCardProps {
  project: string;
  contract: string;
  status: 'Active' | 'Pending';
  creditsMinted: number;
  creditsTotal: number;
  price: number;
  totalValue: number;
  participants: number;
  nextDistribution: string;
  autoMintEnabled: boolean;
}

export function SmartContractCard({
  project,
  contract,
  status,
  creditsMinted,
  creditsTotal,
  price,
  totalValue,
  participants,
  nextDistribution,
  autoMintEnabled,
}: SmartContractCardProps) {
  const progress = (creditsMinted / creditsTotal) * 100;
  const statusColor =
    status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
                <OIcon />
            </div>
            <div>
              <CardTitle className="text-md font-bold">{project}</CardTitle>
              <p className="text-xs text-muted-foreground">Contract {contract}</p>
            </div>
          </div>
          <Badge className={`border-none ${statusColor}`}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium">Credits Minted</label>
            <span className="text-sm text-muted-foreground">
              {creditsMinted.toLocaleString()} / {creditsTotal.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between items-center mt-1">
            <p className="text-xs text-muted-foreground">{progress.toFixed(1)}% Complete</p>
            <div className="flex items-center space-x-2">
                <Switch id={`auto-mint-${contract}`} checked={autoMintEnabled} />
                <Label htmlFor={`auto-mint-${contract}`} className="text-xs">Auto-Mint</Label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2 border-t">
          <div className="flex items-start gap-2">
            <Coins className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Price per Credit</p>
              <p className="font-semibold">${price.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Total Value</p>
              <p className="font-semibold">${totalValue.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Participants</p>
              <p className="font-semibold">{participants}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-muted-foreground">Next Distribution</p>
              <p className="font-semibold">{nextDistribution}</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button variant="outline">
          <FileJson className="mr-2 h-4 w-4" /> View on Chain
        </Button>
        <Button>
          <Gem className="mr-2 h-4 w-4" /> Mint Credits
        </Button>
      </CardFooter>
    </Card>
  );
}
