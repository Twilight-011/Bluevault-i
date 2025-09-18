import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <Leaf className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="mt-4 text-3xl font-bold font-headline">Welcome to BlueVault</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Your hub for mangrove conservation and carbon credits.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please select a dashboard from the navigation menu on the left to get started.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
