'use client';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ChartContainer,
  ChartTooltipContent,
  ChartConfig,
  ChartLegendContent,
} from '@/components/ui';

const chartData = [
  {
    month: 'January',
    treesPlanted: 1860,
    survivalRate: 80,
  },
  {
    month: 'February',
    treesPlanted: 3050,
    survivalRate: 82,
  },
  {
    month: 'March',
    treesPlanted: 2370,
    survivalRate: 85,
  },
  {
    month: 'April',
    treesPlanted: 1730,
    survivalRate: 88,
  },
  {
    month: 'May',
    treesPlanted: 2090,
    survivalRate: 91,
  },
  {
    month: 'June',
    treesPlanted: 2540,
    survivalRate: 93,
  },
];

const chartConfig = {
  treesPlanted: {
    label: 'Trees Planted',
    color: 'hsl(var(--primary))',
  },
  survivalRate: {
    label: 'Survival Rate (%)',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export function HealthOverview() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Project Health Overview</CardTitle>
        <CardDescription>Monthly Planting and Survival Rates</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
            <YAxis yAxisId="right" orientation="right" domain={[60, 100]} stroke="hsl(var(--accent))" />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Bar yAxisId="left" dataKey="treesPlanted" fill="var(--color-treesPlanted)" radius={4} />
            <Bar yAxisId="right" dataKey="survivalRate" fill="var(--color-survivalRate)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
