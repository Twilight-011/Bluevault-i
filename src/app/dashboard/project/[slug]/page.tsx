'use client';
import { HealthOverview } from '@/components/project-health/health-overview';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { placeholderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const projects = [
  {
    slug: 'sunderbans-restoration',
    name: 'Sunderbans Restoration',
    location: 'West Bengal, IN',
    description: 'A flagship project focused on reforesting the Sunderbans, the largest mangrove forest in the world. This project aims to protect the Bengal tiger habitat and create a natural barrier against storm surges.',
    heroImageId: 'project-hero-1'
  },
  {
    slug: 'mahanadi-delta-project',
    name: 'Mahanadi Delta Project',
    location: 'Odisha, IN',
    description: 'This initiative targets the Mahanadi delta region, which is critical for local fisheries and biodiversity. We are working with local communities to restore mangrove cover and promote sustainable aquaculture.',
    heroImageId: 'project-hero-2'
  },
  {
    slug: 'pichavaram-initiative',
    name: 'Pichavaram Initiative',
    location: 'Tamil Nadu, IN',
    description: 'Pichavaram is one of the largest mangrove forests in India. Our work here focuses on enhancing the natural regeneration of mangroves and using technology to monitor forest health in real-time.',
    heroImageId: 'project-hero-3'
  },
  {
    slug: 'godavari-estuary-greens',
    name: 'Godavari Estuary Greens',
    location: 'Andhra Pradesh, IN',
    description: "The Godavari estuary is a vital ecosystem that has faced significant degradation. This project involves large-scale planting drives and the creation of community-managed nurseries to ensure a supply of healthy saplings.",
    heroImageId: 'project-hero-4'
  },
];


export default function ProjectOverviewPage({ params }: { params: { slug: string } }) {
    const project = projects.find(p => p.slug === params.slug);

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
        <CardContent className="p-6">
            <p className="text-muted-foreground">{project.description}</p>
        </CardContent>
      </Card>
      <HealthOverview />
    </div>
  );
}
