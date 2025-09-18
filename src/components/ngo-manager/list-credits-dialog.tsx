'use client';

import { useState } from 'react';
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
import { Coins } from 'lucide-react';

interface ListCreditsDialogProps {
  project: {
    name: string;
    carbonCredits: number;
  };
}

export function ListCreditsDialog({ project }: ListCreditsDialogProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const handleListCredits = () => {
    const numericAmount = parseInt(amount, 10);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid number of credits to list.',
      });
      return;
    }

    if (numericAmount > project.carbonCredits) {
         toast({
            variant: 'destructive',
            title: 'Insufficient Credits',
            description: `You only have ${project.carbonCredits.toLocaleString()} credits available for ${project.name}.`,
         });
         return;
    }

    // Simulate listing credits
    console.log(`Listing ${amount} credits for ${project.name}`);
    toast({
      title: 'Credits Listed Successfully',
      description: `You have listed ${numericAmount.toLocaleString()} credits for ${project.name} on the marketplace.`,
    });
    setOpen(false);
    setAmount('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
            <Coins className="mr-2 h-4 w-4" />
            List Credits
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>List Credits for {project.name}</DialogTitle>
          <DialogDescription>
            Enter the amount of carbon credits (tCO₂e) you want to list on the marketplace.
            You have a total of {project.carbonCredits.toLocaleString()} credits available.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder={`e.g., ${Math.floor(project.carbonCredits / 4)}`}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleListCredits}>
            Confirm Listing
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
