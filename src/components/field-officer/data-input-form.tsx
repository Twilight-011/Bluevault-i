'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, Input, Card, CardContent, CardDescription, CardHeader, CardTitle, Textarea, Slider } from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import { Camera, HardHat, Loader2, Mic } from 'lucide-react';
import { useState } from 'react';

const formSchema = z.object({
  mangroveSpecies: z.string().min(2, {
    message: 'Species name must be at least 2 characters.',
  }),
  treeHealthScore: z.number().min(0).max(100),
  location: z.string().min(5, {
    message: 'Location must be at least 5 characters.',
  }),
  photos: z.any(),
  voiceNote: z.string().optional(),
});

export function DataInputForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mangroveSpecies: '',
      treeHealthScore: 75,
      location: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    setTimeout(() => {
      toast({
        title: 'Submission Successful',
        description: 'Your field data has been recorded.',
      });
      form.reset();
      form.setValue('treeHealthScore', 75);
      setIsLoading(false);
    }, 1500);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <HardHat className="h-6 w-6" /> Field Data Input
        </CardTitle>
        <CardDescription>
          Fill in the details below to log new mangrove data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="mangroveSpecies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mangrove Species</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Rhizophora mangle" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location Data</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Sector 4B, Sunderbans" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="treeHealthScore"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tree Health Score: {field.value}</FormLabel>
                  <FormControl>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      defaultValue={[field.value]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormDescription>
                    Rate the health of the mangrove from 0 (dead) to 100 (thriving).
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Multimedia Attachments</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <Camera className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input type="file" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                   <FormDescription>
                    Upload relevant pictures of the area.
                  </FormDescription>
                </FormItem>
              )}
            />
             <FormField
                control={form.control}
                name="voiceNote"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Voice-to-Text Notes</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea
                          placeholder="Click the mic to start recording your notes..."
                          className="pr-10"
                          {...field}
                        />
                        <Button variant="ghost" size="icon" className="absolute right-1 top-1 h-8 w-8">
                           <Mic className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>
                      Record observations using your voice.
                    </FormDescription>
                  </FormItem>
                )}
              />
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
