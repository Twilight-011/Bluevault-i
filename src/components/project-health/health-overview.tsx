'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  {
    month: 'January',
    ngoEffort: 186,
    carbonProduction: 80,
  },
  {
    month: 'February',
    ngoEffort: 305,
    carbonProduction: 200,
  },
  {
    month: 'March',
    ngoEffort: 237,
    carbonProduction: 120,
  },
  {
    month: 'April',
    ngoEffort: 173,
    carbonProduction: 190,
  },
  {
    month: 'May',
    ngoEffort: 209,
    carbonProduction: 130,
  },
  {
    month: 'June',
    ngoEffort: 214,
    carbonProduction: 140,
  },
];

const chartConfig = {
  carbonProduction: {
    label: 'Carbon Production (tCO2e)',
    color: 'hsl(var(--primary))',
  },
  ngoEffort: {
    label: 'NGO Effort Score',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function HealthOverview() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Project Health Overview</CardTitle>
        <CardDescription>Carbon Production vs. NGO Effort</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
            <p className="text-sm text-muted-foreground">
                Our NGO focuses on a holistic approach, combining new plantings with community education to ensure long-term project sustainability. We believe this strategy maximizes both ecological and social impact, leading to robust carbon sequestration over time.
            </p>
          <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <Tooltip content={<ChartTooltipContent />} />
              <Bar dataKey="carbonProduction" fill="var(--color-carbonProduction)" radius={4} />
              <Bar dataKey="ngoEffort" fill="var(--color-ngoEffort)" radius={4} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
