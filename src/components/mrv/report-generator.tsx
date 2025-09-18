
'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSearchParams } from 'next/navigation';
import { generateDynamicMRVReport } from '@/ai/flows/generate-dynamic-mrv-report';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { FileText, Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  projectData: z
    .string()
    .min(50, 'Please provide more detailed project data (min. 50 characters).'),
  ngoDescription: z
    .string()
    .min(50, 'Please provide a more detailed NGO description (min. 50 characters).'),
});

const defaultProjectData = `Project: Sunderbans Restoration, Period: Q2 2024.
- Area Covered: 50 hectares.
- Trees Planted: 15,230 (Rhizophora mangle).
- Survival Rate: 88%.
- Carbon Sequestration (est.): 1,200 tCO2e.
- Community Engagement: 250 members trained in sustainable practices.
- Water Salinity: Decreased by 5%.
- Biodiversity Index: Increased by 12 points (bird species count up by 8).`;

const defaultNgoDescription = `Our efforts in Q2 2024 were focused on scaling up planting activities while strengthening our community partnerships. We introduced advanced monitoring drones to improve accuracy in survival rate tracking. Our educational workshops have been a great success, leading to increased local stewardship of the mangrove ecosystem. We're optimistic that these combined efforts are creating a resilient and thriving habitat.`;


function ReportGeneratorComponent() {
  const { toast } = useToast();
  const [report, setReport] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      projectData: searchParams.get('projectData') || defaultProjectData,
      ngoDescription: searchParams.get('ngoDescription') || defaultNgoDescription,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setReport('');
    try {
      const result = await generateDynamicMRVReport(values);
      setReport(result.report);
      toast({
        title: 'Report Generated Successfully',
        description: 'The MRV report is now available for review.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error Generating Report',
        description:
          'An unexpected error occurred. Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const projectData = searchParams.get('projectData');
    const ngoDescription = searchParams.get('ngoDescription');
    if (projectData && ngoDescription) {
        form.setValue('projectData', projectData);
        form.setValue('ngoDescription', ngoDescription);
        onSubmit({ projectData, ngoDescription });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <Sparkles className="h-6 w-6 text-primary" />
            Dynamic MRV Report Generator
          </CardTitle>
          <CardDescription>
            Input project data and NGO efforts to generate an AI-powered report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mangrove Project Data</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter raw project data..."
                        className="h-48"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Include metrics like area, trees planted, survival rate, etc.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ngoDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NGO Description of Efforts</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the NGO's activities and strategy..."
                        className="h-32"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide context on the work being done.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Report'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-headline">
            <FileText className="h-6 w-6" />
            Generated Report
          </CardTitle>
          <CardDescription>
            This is the AI-generated report based on your inputs.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none dark:prose-invert">
          {isLoading ? (
             <div className="space-y-4">
              <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-5/6 animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-1/2 animate-pulse mt-6"></div>
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
              <div className="h-4 bg-muted rounded w-full animate-pulse"></div>
            </div>
          ) : report ? (
            <div className="whitespace-pre-wrap font-body">{report}</div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64">
                <FileText className="h-12 w-12 mb-4" />
                <p>Your generated report will appear here.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export function ReportGenerator() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ReportGeneratorComponent />
        </Suspense>
    )
}
