'use client';
import { DataInputForm } from '@/components/field-officer/data-input-form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Siren } from 'lucide-react';
import { useAlerts } from '@/context/alert-context';
import { PostCreator } from '@/components/field-officer/post-creator';

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
        <DataInputForm />
      </div>
      <div className="grid auto-rows-max gap-8">
        <PostCreator />
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Emergency Protocol</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              Press this button only in a critical emergency to alert managers.
            </p>
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
    </div>
  );
}
