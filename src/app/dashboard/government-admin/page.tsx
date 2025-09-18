
'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Briefcase,
  CheckCircle2,
  DollarSign,
  Users,
  ArrowUp,
  Building,
  HardHat,
} from 'lucide-react';
import { ProjectOverviewCard } from '@/components/gov-admin/project-overview-card';
import Link from 'next/link';

const statCards = [
  {
    label: 'Total Projects',
    value: '8',
    change: '+2',
    icon: Briefcase,
    color: 'bg-primary text-primary-foreground',
    changeColor: 'bg-primary-foreground/20 text-primary-foreground',
    href: '#',
  },
  {
    label: 'Verified NGOs',
    value: '4',
    change: '+1',
    icon: Users,
    color: 'bg-card',
    changeColor: 'bg-green-100 text-green-700',
    href: '/dashboard/ngos',
  },
  {
    label: 'Verified Companies',
    value: '4',
    change: '+1',
    icon: Building,
    color: 'bg-card',
    changeColor: 'bg-green-100 text-green-700',
    href: '/dashboard/companies',
  },
  {
    label: 'Total Credits Verified',
    value: '3.1M',
    change: '+18%',
    icon: CheckCircle2,
    color: 'bg-green-50',
    changeColor: 'bg-green-100 text-green-700',
    href: '#',
  },
];

const projects = [
    {
        flightId: 'DR-001',
        projectName: 'Sundarbans Restoration',
        location: 'Sundarbans, Bangladesh',
        timestamp: '2 hours ago',
        monitoringStatus: 'Verified',
        temperature: '28.5°C',
        humidity: '78%',
        windSpeed: '12.3 km/h',
        images: 156,
        carbonCapture: 8.4,
        ecosystemHealth: 92,
        contract: '#0x1a2b3c...',
        contractStatus: 'Active',
        creditsMinted: 67500,
        creditsTotal: 100000,
        price: 45.2,
        totalValue: 4520000,
        participants: 234,
        nextDistribution: 'Tomorrow',
        autoMintEnabled: true,
    },
    {
        flightId: 'DR-002',
        projectName: 'Maldives Atoll Conservation',
        location: 'Maldives Atoll',
        timestamp: '4 hours ago',
        monitoringStatus: 'Processing',
        temperature: '31.2°C',
        humidity: '85%',
        windSpeed: '8.7 km/h',
        images: 203,
        carbonCapture: 6.7,
        ecosystemHealth: 88,
        contract: '#0x7g8h9i...',
        contractStatus: 'Pending',
        creditsMinted: 25000,
        creditsTotal: 50000,
        price: 38.5,
        totalValue: 1925000,
        participants: 89,
        nextDistribution: 'In 3 days',
        autoMintEnabled: false,
    },
     {
        flightId: 'DR-003',
        projectName: 'Mumbai Coastal Protection',
        location: 'Mumbai, India',
        timestamp: '1 day ago',
        monitoringStatus: 'Verified',
        temperature: '29.8°C',
        humidity: '82%',
        windSpeed: '15.1 km/h',
        images: 189,
        carbonCapture: 5.2,
        ecosystemHealth: 89,
        contract: '#0x4d5e6f...',
        contractStatus: 'Active',
        creditsMinted: 3000,
        creditsTotal: 10000,
        price: 52.0,
        totalValue: 520000,
        participants: 150,
        nextDistribution: 'In 1 week',
        autoMintEnabled: true,
    },
    {
        flightId: 'DR-004',
        projectName: 'Amazon Delta Initiative',
        location: 'Amazon Delta, Brazil',
        timestamp: '3 days ago',
        monitoringStatus: 'Verified',
        temperature: '26.1°C',
        humidity: '90%',
        windSpeed: '5.5 km/h',
        images: 340,
        carbonCapture: 15.6,
        ecosystemHealth: 95,
        contract: '#0x2a3b4c...',
        contractStatus: 'Active',
        creditsMinted: 150000,
        creditsTotal: 200000,
        price: 48.0,
        totalValue: 9600000,
        participants: 450,
        nextDistribution: 'Next month',
        autoMintEnabled: true,
    }
]

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
  changeColor,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  color: string;
  changeColor: string;
  href: string;
}) {
  const CardContentWrapper = ({children}: {children: React.ReactNode}) => (
    <Card className={`shadow-md ${color}`}>
        {children}
    </Card>
  )

  const cardContent = (
    <>
    <CardHeader>
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="flex items-center justify-between">
      <div className="text-3xl font-bold">{value}</div>
      <div
        className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${changeColor}`}
      >
        {change && <ArrowUp className="h-3 w-3" />}
        {change}
      </div>
    </CardContent>
    </>
  )

  if (href && href !== '#') {
    return <Link href={href}><CardContentWrapper>{cardContent}</CardContentWrapper></Link>;
  }

  return <CardContentWrapper>{cardContent}</CardContentWrapper>;
}

export default function GovernmentAdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      <div className="space-y-6">
          <h2 className="text-xl font-semibold">Project Overview</h2>
          <div className="grid grid-cols-1 gap-8">
            {projects.map(project => (
                <ProjectOverviewCard key={project.flightId} {...project} />
            ))}
          </div>
      </div>
    </div>
  );
}
