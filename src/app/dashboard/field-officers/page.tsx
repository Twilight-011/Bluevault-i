
'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HardHat, Users } from 'lucide-react';
import { placeholderImages } from '@/lib/placeholder-images';

const fieldOfficers = [
    { name: 'Anjali Sharma', location: 'Sunderbans Sector 4B', avatarId: 'avatar-4', ngo: 'Coastal Guardians' },
    { name: 'Vikram Singh', location: 'Mahanadi Delta', avatarId: 'avatar-5', ngo: 'Coastal Guardians' },
    { name: 'Priya Patel', location: 'Pichavaram Forest', avatarId: 'avatar-6', ngo: 'GreenFuture Foundation' },
    { name: 'Ravi Kumar', location: 'Godavari Estuary', avatarId: 'avatar-8', ngo: 'GreenFuture Foundation' },
    { name: 'Sunita Devi', location: 'Sunderbans Sector 5A', avatarId: 'avatar-9', ngo: 'Ocean Foundation' },
    { name: 'Deepak Ghosh', location: 'Mahanadi Delta', avatarId: 'avatar-10', ngo: 'Coastal Guardians' },
    { name: 'Meena Iyer', location: 'Pichavaram Forest', avatarId: 'avatar-11', ngo: 'GreenFuture Foundation' },
    { name: 'Karthik Reddy', location: 'Godavari Estuary', avatarId: 'avatar-2', ngo: 'Ocean Foundation' },
    { name: 'Fatima Sheikh', location: 'Sunderbans Sector 6C', avatarId: 'avatar-3', ngo: 'Ocean Foundation' },
    { name: 'Gopal Verma', location: 'Mahanadi Delta', avatarId: 'avatar-7', ngo: 'Coastal Guardians' },
    { name: 'Rajesh Kumar', location: 'Mumbai Coast', avatarId: 'avatar-1', ngo: 'Urban Oasis' },
    { name: 'Sanjay Dutt', location: 'Mumbai Coast', avatarId: 'avatar-2', ngo: 'Urban Oasis' },
];

export default function FieldOfficersPage() {
  return (
    <div className="space-y-8">
      <Card className="shadow-none border-0 bg-transparent">
        <CardHeader className="px-0">
          <CardTitle className="flex items-center gap-2 font-headline text-2xl">
            <HardHat /> Field Officers
          </CardTitle>
          <CardDescription>
            A directory of all field officers and their affiliated NGOs.
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="shadow-lg">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Officer</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Affiliated NGO</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fieldOfficers.map((officer) => {
                const avatar = placeholderImages.find(p => p.id === officer.avatarId);
                return (
                  <TableRow key={officer.name}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                           {avatar && <AvatarImage src={avatar.imageUrl} alt={officer.name} data-ai-hint={avatar.imageHint} />}
                          <AvatarFallback>{officer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{officer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{officer.location}</TableCell>
                    <TableCell>{officer.ngo}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
