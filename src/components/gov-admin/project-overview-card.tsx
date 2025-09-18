
'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  Button,
  Progress,
  Badge,
  Switch,
  Label,
} from '@/components/ui';
import {
  Thermometer,
  Wind,
  Camera,
  Eye,
  Clock,
  MapPin,
  Coins,
  Users,
  TrendingUp,
  FileJson,
  Gem,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';


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
    <path d="M12 18a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 0 -1 0v4a.5.5 0 0 0 .5.5z" />
    <path d="M18.36 15.64a9 9 0 1 0 -12.72 0" />
    <path d="M12 6V2" />
    <path d="m19.07 4.93 -1.41 1.41" />
    <path d="M4.93 4.93 6.34 6.34" />
  </svg>
);

const OIcon = () => (
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
        <circle cx="12" cy="12" r="10" stroke="currentColor" fill="none" />
    </svg>
)

interface ProjectOverviewCardProps {
    flightId: string;
    projectName: string;
    location: string;
    timestamp: string;
    monitoringStatus: 'Verified' | 'Processing';
    temperature: string;
    humidity: string;
    windSpeed: string;
    images: number;
    carbonCapture: number;
    ecosystemHealth: number;
    contract: string;
    contractStatus: 'Active' | 'Pending';
    creditsMinted: number;
    creditsTotal: number;
    price: number;
    totalValue: number;
    participants: number;
    nextDistribution: string;
    autoMintEnabled: boolean;
}

export function ProjectOverviewCard({
  flightId,
  projectName,
  location,
  timestamp,
  monitoringStatus,
  temperature,
  humidity,
  windSpeed,
  images,
  carbonCapture,
  ecosystemHealth,
  contract,
  contractStatus,
  creditsMinted,
  creditsTotal,
  price,
  totalValue,
  participants,
  nextDistribution,
  autoMintEnabled
}: ProjectOverviewCardProps) {
  const { toast } = useToast();
  const router = useRouter();
  const monitoringStatusColor =
    monitoringStatus === 'Verified' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    const contractStatusColor =
    contractStatus === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';
    const creditProgress = (creditsMinted / creditsTotal) * 100;

    const handleMintCredits = () => {
        toast({
            title: "Minting Credits",
            description: `Successfully minted ${ (creditsTotal - creditsMinted).toLocaleString() } new credits for the ${projectName} project.`,
        });
    }

    const handleViewDetailedReport = () => {
        const projectData = `Project: ${projectName}, Location: ${location}, Flight ID: ${flightId}
- Monitoring Status: ${monitoringStatus}
- Timestamp: ${timestamp}
- Temperature: ${temperature}, Humidity: ${humidity}, Wind Speed: ${windSpeed}
- Images Captured: ${images}
- Carbon Capture Estimate: ${carbonCapture} tCO2
- Ecosystem Health Score: ${ecosystemHealth}%
- Contract: ${contract} (${contractStatus})
- Credits Minted: ${creditsMinted} of ${creditsTotal}
- Participants: ${participants}`;

        const ngoDescription = `This report is auto-generated based on the latest verified data for the ${projectName} project. The NGO's primary focus has been on scaling monitoring operations and ensuring data integrity for accurate credit minting and distribution. Community involvement remains a key priority, with ongoing efforts to engage local stakeholders.`;
        
        const query = new URLSearchParams({
            projectData: projectData,
            ngoDescription: ngoDescription
        });

        router.push(`/dashboard/mrv-report?${query.toString()}`);
    }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-bold">{projectName}</CardTitle>
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {location}</span>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
        {/* Monitoring Data Section */}
        <div className="space-y-4">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                    <DroneIcon />
                    </div>
                    <div>
                    <h3 className="font-semibold text-md">Monitoring Data</h3>
                    <p className="text-xs text-muted-foreground">Flight #{flightId} - {timestamp}</p>
                    </div>
                </div>
                <Badge className={`border-none ${monitoringStatusColor}`}>{monitoringStatus}</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-muted-foreground" />
                    <span>Temp:</span>
                    <span className="font-medium ml-auto">{temperature}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-muted-foreground" />
                    <span>Wind:</span>
                    <span className="font-medium ml-auto">{windSpeed}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Camera className="h-4 w-4 text-muted-foreground" />
                    <span>Images:</span>
                    <span className="font-medium ml-auto">{images}</span>
                </div>
            </div>

             <div className="space-y-3 pt-2">
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
        </div>

        {/* Smart Contract Section */}
        <div className="space-y-4 lg:border-l lg:pl-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary rounded-lg">
                    <OIcon />
                    </div>
                    <div>
                    <h3 className="font-semibold text-md">Smart Contract</h3>
                    <p className="text-xs text-muted-foreground">{contract}</p>
                    </div>
                </div>
                <Badge className={`border-none ${contractStatusColor}`}>{contractStatus}</Badge>
            </div>
            
             <div>
                <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-medium">Credits Minted</label>
                    <span className="text-sm text-muted-foreground">
                    {creditsMinted.toLocaleString()} / {creditsTotal.toLocaleString()}
                    </span>
                </div>
                <Progress value={creditProgress} className="h-2" />
                <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-muted-foreground">{creditProgress.toFixed(1)}% Complete</p>
                    <div className="flex items-center space-x-2">
                        <Switch id={`auto-mint-${contract}`} checked={autoMintEnabled} />
                        <Label htmlFor={`auto-mint-${contract}`} className="text-xs">Auto-Mint</Label>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2 border-t">
                <div className="flex items-start gap-2">
                    <Coins className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                    <p className="text-muted-foreground">Price/Credit</p>
                    <p className="font-semibold">${price.toFixed(1)}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                    <p className="text-muted-foreground">Total Value</p>
                    <p className="font-semibold">${totalValue.toLocaleString()}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                    <p className="text-muted-foreground">Participants</p>
                    <p className="font-semibold">{participants}</p>
                    </div>
                </div>
                <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                    <p className="text-muted-foreground">Next Payout</p>
                    <p className="font-semibold">{nextDistribution}</p>
                    </div>
                </div>
            </div>
        </div>
      </CardContent>
      <CardFooter className="gap-2 border-t pt-6 mt-4">
        <Button variant="outline" className="w-full" onClick={handleViewDetailedReport}>
            <Eye className="mr-2 h-4 w-4" /> View Detailed Report
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link href="https://etherscan.io/" target="_blank">
            <FileJson className="mr-2 h-4 w-4" /> View on Chain
          </Link>
        </Button>
         <Button className="w-full" onClick={handleMintCredits}>
          <Gem className="mr-2 h-4 w-4" /> Mint Credits
        </Button>
      </CardFooter>
    </Card>
  );
}
