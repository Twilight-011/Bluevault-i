'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { useParams, notFound } from 'next/navigation';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltipContent, ChartConfig, ChartLegendContent } from '@/components/ui/chart';

const projects = [
  {
    slug: 'sunderbans-restoration',
    name: 'Sunderbans Restoration',
    location: 'West Bengal, IN',
    description: 'A flagship project focused on reforesting the Sunderbans, the largest mangrove forest in the world. This project aims to protect the Bengal tiger habitat and create a natural barrier against storm surges.',
    heroImageId: 'project-hero-1',
    carbonCredits: '5,000'
  },
  {
    slug: 'mahanadi-delta-project',
    name: 'Mahanadi Delta Project',
    location: 'Odisha, IN',
    description: 'This initiative targets the Mahanadi delta region, which is critical for local fisheries and biodiversity. We are working with local communities to restore mangrove cover and promote sustainable aquaculture.',
    heroImageId: 'project-hero-2',
    carbonCredits: '12,000'
  },
  {
    slug: 'pichavaram-initiative',
    name: 'Pichavaram Initiative',
    location: 'Tamil Nadu, IN',
    description: 'Pichavaram is one of the largest mangrove forests in India. Our work here focuses on enhancing the natural regeneration of mangroves and using technology to monitor forest health in real-time.',
    heroImageId: 'project-hero-3',
    carbonCredits: '2,500'
  },
  {
    slug: 'godavari-estuary-greens',
    name: 'Godavari Estuary Greens',
    location: 'Andhra Pradesh, IN',
    description: "The Godavari estuary is a vital ecosystem that has faced significant degradation. This project involves large-scale planting drives and the creation of community-managed nurseries to ensure a supply of healthy saplings.",
    heroImageId: 'project-hero-4',
    carbonCredits: '8,000'
  },
   {
    slug: 'krishna-mangrove-regeneration',
    name: 'Krishna Mangrove Regeneration',
    location: 'Andhra Pradesh, IN',
    description: "Revitalizing the Krishna river delta's mangrove ecosystem to support local livelihoods and enhance coastal resilience.",
    heroImageId: 'project-hero-1',
    carbonCredits: '6,500'
  },
   {
    slug: 'mumbai-coastal-protection',
    name: 'Mumbai Coastal Protection',
    location: 'Maharashtra, IN',
    description: "A crucial urban mangrove project aimed at protecting Mumbai's coastline from erosion and sea-level rise, creating a green lung for the city.",
    heroImageId: 'project-hero-2',
    carbonCredits: '3,000'
  },
];

const chartData = [
  { month: 'January', treesPlanted: 1860, survivalRate: 80 },
  { month: 'February', treesPlanted: 3050, survivalRate: 82 },
  { month: 'March', treesPlanted: 2370, survivalRate: 85 },
  { month: 'April', treesPlanted: 1730, survivalRate: 88 },
  { month: 'May', treesPlanted: 2090, survivalRate: 91 },
  { month: 'June', treesPlanted: 2540, survivalRate: 93 },
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


export default function ProjectOverviewPage() {
    const params = useParams();
    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    const heroImage = placeholderImages.find(img => img.id === project.heroImageId);

  return (
    <div className="grid gap-8 auto-rows-max">
      <Card className="shadow-lg overflow-hidden">
        <div className="relative h-64 w-full">
            {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={project.name}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6">
                <h1 className="text-4xl font-bold text-white font-headline">{project.name}</h1>
                <p className="text-lg text-white/90">{project.location}</p>
            </div>
        </div>
        <CardContent className="p-6 grid gap-6">
            <p className="text-muted-foreground">{project.description}</p>
             <Card>
                <CardHeader>
                    <CardTitle>Carbon Credit Generation</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-3xl font-bold">{parseInt(project.carbonCredits).toLocaleString()} <span className="text-base font-normal text-muted-foreground">tCO₂e</span></p>
                    <p className="text-sm text-muted-foreground">Total carbon credits generated to date.</p>
                </CardContent>
            </Card>
        </CardContent>
      </Card>
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
    </div>
  );
}
