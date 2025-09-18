
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Thermometer,
  Wind,
  Camera,
  Download,
  Eye,
  Clock,
  MapPin,
} from 'lucide-react';

// Use an inline SVG for the drone icon as it's not in lucide-react
const DroneIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-6 w-6 text-primary-foreground"
  >
    <path d="M12 18a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0-1 0v4a.5.5 0 0 0 .5.5z" />
    <path d="M18.36 15.64a9 9 0 1 0-12.72 0" />
    <path d="M12 6V2" />
    <path d="m19.07 4.93-1.41 1.41" />
    <path d="M4.93 4.93 6.34 6.34" />
  </svg>
);


interface DroneDataCardProps {
  flightId: string;
  location: string;
  timestamp: string;
  status: 'Verified' | 'Processing';
  temperature: string;
  humidity: string;
  windSpeed: string;
  images: number;
  carbonCapture: number;
  ecosystemHealth: number;
}

export function DroneDataCard({
  flightId,
  location,
  timestamp,
  status,
  temperature,
  humidity,
  windSpeed,
  images,
  carbonCapture,
  ecosystemHealth,
}: DroneDataCardProps) {
  const statusVariant = status === 'Verified' ? 'default' : 'secondary';
  const statusColor =
    status === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-lg">
              <DroneIcon />
            </div>
            <div>
              <CardTitle className="text-lg font-bold">Flight #{flightId}</CardTitle>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                 <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {location}</span>
                 <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {timestamp}</span>
              </div>
            </div>
          </div>
          <Badge className={`border-none ${statusColor}`}>{status}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Temperature</span>
            <span className="ml-auto">{temperature}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium ml-6">Humidity</span>
            <span className="ml-auto">{humidity}</span>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Wind Speed</span>
            <span className="ml-auto">{windSpeed}</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Images</span>
            <span className="ml-auto">{images}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Carbon Capture</label>
            <span className="text-sm font-bold">{carbonCapture.toFixed(1)} tCO₂</span>
          </div>
          <Progress value={(carbonCapture / 10) * 100} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Ecosystem Health</label>
            <span className="text-sm font-bold text-green-600">{ecosystemHealth}%</span>
          </div>
          <Progress value={ecosystemHealth} className="h-2" indicatorClassName="bg-green-500" />
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button variant="outline" className="w-full">
          <Eye className="mr-2 h-4 w-4" /> View Details
        </Button>
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </CardFooter>
    </Card>
  );
}
