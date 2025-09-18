
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
} from 'lucide-react';
import { ProjectOverviewCard } from '@/components/gov-admin/project-overview-card';

const statCards = [
  {
    label: 'Total Projects',
    value: '156',
    change: '+8',
    icon: Briefcase,
    color: 'bg-primary text-primary-foreground',
    changeColor: 'bg-primary-foreground/20 text-primary-foreground',
  },
  {
    label: 'Credits Verified',
    value: '2.4M',
    change: '+15%',
    icon: CheckCircle2,
    color: 'bg-card',
    changeColor: 'bg-green-100 text-green-700',
  },
  {
    label: 'Revenue Generated',
    value: '$48.2M',
    change: '+22%',
    icon: DollarSign,
    color: 'bg-green-50',
    changeColor: 'bg-green-100 text-green-700',
  },
  {
    label: 'Active Participants',
    value: '1,247',
    change: '+34',
    icon: Users,
    color: 'bg-card',
    changeColor: 'bg-green-100 text-green-700',
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
    }
]

function StatCard({
  icon: Icon,
  label,
  value,
  change,
  color,
  changeColor,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
  color: string;
  changeColor: string;
}) {
  return (
    <Card className={`shadow-md ${color}`}>
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
          {label !== 'Total Projects' && <ArrowUp className="h-3 w-3" />}
          {change}
        </div>
      </CardContent>
    </Card>
  );
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
