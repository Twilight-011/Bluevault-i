'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images';
import { ScrollArea } from '../ui/scroll-area';

const feedItems = [
  {
    user: 'Alia Khan',
    handle: 'NGO Manager',
    avatarId: 'avatar-1',
    time: '2h ago',
    content:
      'Great progress this week team! We’ve planted over 500 new saplings in the northern corridor. Let’s keep up the momentum!',
  },
  {
    user: 'Rajesh Kumar',
    handle: 'Field Officer',
    avatarId: 'avatar-2',
    time: '5h ago',
    content:
      'Spotted a rare species of kingfisher near Site B today. A good sign of improving biodiversity. #conservation #mangroves',
  },
  {
    user: 'Eco Corp.',
    handle: 'Company',
    avatarId: 'avatar-3',
    time: '1d ago',
    content:
      'We are proud to announce our partnership with BlueVault to offset our carbon footprint through mangrove restoration. #sustainability',
  },
];

export default function SocialFeed() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Project Updates</CardTitle>
        <CardDescription>A live feed of updates from all stakeholders.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-6">
            {feedItems.map((item, index) => {
              const avatar = placeholderImages.find(
                (img) => img.id === item.avatarId
              );
              return (
                <div key={index} className="flex items-start gap-4">
                  <Avatar>
                    {avatar && (
                      <AvatarImage
                        src={avatar.imageUrl}
                        alt={item.user}
                        data-ai-hint={avatar.imageHint}
                      />
                    )}
                    <AvatarFallback>
                      {item.user.charAt(0)}
                      {item.user.includes(' ') ? item.user.split(' ')[1].charAt(0) : ''}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{item.user}</div>
                      <div className="text-xs text-muted-foreground">{item.time}</div>
                    </div>
                    <p className="text-xs text-muted-foreground">@{item.handle.replace(' ', '')}</p>
                    <p className="mt-2 text-sm">{item.content}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
