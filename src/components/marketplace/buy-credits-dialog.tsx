'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';
import { Badge } from '../ui/badge';

interface Credit {
  project: string;
  slug: string;
  location: string;
  price: number;
  healthScore: number;
  available: number;
  trend: 'up' | 'down' | 'stable';
}

interface BuyCreditsDialogProps {
  credit: Credit;
}

export function BuyCreditsDialog({ credit }: BuyCreditsDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const totalCost = useMemo(() => {
    const numericAmount = parseInt(amount, 10);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return 0;
    }
    return numericAmount * credit.price;
  }, [amount, credit.price]);

  const handlePurchase = () => {
    const numericAmount = parseInt(amount, 10);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid number of credits to purchase.',
      });
      return;
    }
    
    if (numericAmount > credit.available) {
        toast({
           variant: 'destructive',
           title: 'Insufficient Credits Available',
           description: `There are only ${credit.available.toLocaleString()} credits available for this project.`,
        });
        return;
    }

    // Simulate purchase
    console.log(`Purchasing ${amount} credits from ${credit.project} for a total of ₹${totalCost.toFixed(2)}.`);
    toast({
      title: 'Purchase Successful',
      description: `You have purchased ${numericAmount.toLocaleString()} carbon credits from ${credit.project}.`,
    });
    setOpen(false);
    setAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Buy Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy Carbon Credits</DialogTitle>
          <DialogDescription>
            Purchase credits from the <span className='font-semibold'>{credit.project}</span> project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                     <Label>Price per credit (tCO₂e)</Label>
                     <Badge variant="outline">₹{credit.price.toFixed(2)}</Badge>
                </div>
                 <div className='flex justify-between items-center'>
                     <Label>Credits Available</Label>
                     <Badge variant="secondary">{credit.available.toLocaleString()}</Badge>
                </div>
            </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`e.g., 100`}
              className="col-span-3"
            />
          </div>
          {totalCost > 0 && (
             <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center font-semibold">
                    <span>Total Cost</span>
                    <span>₹{totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <p className="text-xs text-muted-foreground text-right mt-1">
                    ( {amount} credits &times; ₹{credit.price.toFixed(2)} )
                </p>
             </div>
          )}
        </div>
        <DialogFooter>
          <Button type="button" onClick={handlePurchase} disabled={!amount || parseInt(amount, 10) <= 0}>
            Confirm Purchase
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
