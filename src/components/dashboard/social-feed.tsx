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
import { useSocialFeed } from '@/context/social-feed-context';
import { formatDistanceToNow } from 'date-fns';

export default function SocialFeed() {
  const { feedItems } = useSocialFeed();

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Project Updates</CardTitle>
        <CardDescription>A live feed of updates from all stakeholders.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
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
                      <div className="text-xs text-muted-foreground">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </div>
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
