'use client';

import { useState } from 'react';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from '@/components/ui';
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
  const [price, setPrice] = useState('');
  const { toast } = useToast();

  const handleListCredits = () => {
    const numericAmount = parseInt(amount, 10);
    const numericPrice = parseFloat(price);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast({
        variant: 'destructive',
        title: 'Invalid Amount',
        description: 'Please enter a valid number of credits to list.',
      });
      return;
    }

    if (isNaN(numericPrice) || numericPrice <= 0) {
       toast({
        variant: 'destructive',
        title: 'Invalid Price',
        description: 'Please enter a valid price for the credits.',
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
    console.log(`Listing ${amount} credits for ${project.name} at ${price} each.`);
    toast({
      title: 'Credits Listed Successfully',
      description: `You have listed ${numericAmount.toLocaleString()} credits for ${project.name} on the marketplace at ${numericPrice.toFixed(2)} each.`,
    });
    setOpen(false);
    setAmount('');
    setPrice('');
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
            Enter the amount and price per credit (tCO₂e) you want to list on the marketplace.
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
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price (INR)
            </Label>
             <div className="relative col-span-3">
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="e.g., 2150.00"
                  className="pl-2"
                />
            </div>
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
