'use server';

/**
 * @fileOverview A dynamic MRV report generation AI agent.
 *
 * - generateDynamicMRVReport - A function that handles the MRV report generation process.
 * - GenerateDynamicMRVReportInput - The input type for the generateDynamicMRVReport function.
 * - GenerateDynamicMRVReportOutput - The return type for the generateDynamicMRVReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDynamicMRVReportInputSchema = z.object({
  projectData: z.string().describe('The mangrove project data to analyze.'),
  ngoDescription: z.string().describe('The NGO description of their efforts.'),
});
export type GenerateDynamicMRVReportInput = z.infer<
  typeof GenerateDynamicMRVReportInputSchema
>;

const GenerateDynamicMRVReportOutputSchema = z.object({
  report: z.string().describe('The generated MRV report.'),
});
export type GenerateDynamicMRVReportOutput = z.infer<
  typeof GenerateDynamicMRVReportOutputSchema
>;

export async function generateDynamicMRVReport(
  input: GenerateDynamicMRVReportInput
): Promise<GenerateDynamicMRVReportOutput> {
  return generateDynamicMRVReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDynamicMRVReportPrompt',
  input: {schema: GenerateDynamicMRVReportInputSchema},
  output: {schema: GenerateDynamicMRVReportOutputSchema},
  prompt: `You are an expert in analyzing mangrove project data and generating MRV reports.

  Analyze the following mangrove project data and generate an MRV report highlighting project progress and key data points for stakeholders.

  Mangrove Project Data: {{{projectData}}}
  NGO Description: {{{ngoDescription}}}

  Report:
  `,
});

const generateDynamicMRVReportFlow = ai.defineFlow(
  {
    name: 'generateDynamicMRVReportFlow',
    inputSchema: GenerateDynamicMRVReportInputSchema,
    outputSchema: GenerateDynamicMRVReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
