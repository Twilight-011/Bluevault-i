'use client';
import { DataInputForm } from '@/components/field-officer/data-input-form';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, Button } from '@/components/ui';
import { Siren, Wind, Droplets, Leaf, BarChart2 } from 'lucide-react';
import { useAlerts } from '@/context/alert-context';
import { PostCreator } from '@/components/field-officer/post-creator';

function StatCard({ icon: Icon, label, value, unit }: {icon: React.ElementType, label: string, value: string, unit: string}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{unit}</p>
            </CardContent>
        </Card>
    )
}

export default function FieldOfficerDashboard() {
  const { addAlert } = useAlerts();

  const handleEmergency = () => {
    addAlert(
      'Immediate assistance required due to illegal logging activity.',
      'Sunderbans Sector 4B'
    );
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2 grid auto-rows-max gap-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard icon={Leaf} label="Trees Planted" value="15,230" unit="Total" />
            <StatCard icon={Droplets} label="Avg. O₂ Release" value="39,598" unit="kg/day" />
            <StatCard icon={Wind} label="CO₂ Sequestered" value="1.2" unit="tCO₂e" />
            <StatCard icon={BarChart2} label="Health Score" value="92" unit="Avg. Score" />
        </div>
        <DataInputForm />
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Emergency Protocol</CardTitle>
            <CardDescription>
              Press this button only in a critical emergency to alert managers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="destructive"
              className="w-full"
              onClick={handleEmergency}
            >
              <Siren className="mr-2 h-4 w-4" /> Trigger Emergency Alert
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max gap-8">
        <PostCreator />
      </div>
    </div>
  );
}
