
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { placeholderImages } from '@/lib/placeholder-images';
import { useSocialFeed } from '@/context/social-feed-context';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '../ui/button';
import { Heart, MessageCircle, Send } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

function PostActions() {
    const [liked, setLiked] = useState(false);
    const { toast } = useToast();

    const handleComment = () => {
        toast({
            title: "Comment Added",
            description: "Your comment has been posted.",
        });
    }

    const handleShare = () => {
        toast({
            title: "Post Shared",
            description: "The post has been shared successfully.",
        });
    }

    return (
        <div className="flex justify-start gap-4 border-t pt-4">
            <Button variant="ghost" size="sm" onClick={() => setLiked(!liked)}>
                <Heart className={`mr-2 h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                Like
            </Button>
            <Button variant="ghost" size="sm" onClick={handleComment}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Comment
            </Button>
            <Button variant="ghost" size="sm" onClick={handleShare}>
                <Send className="mr-2 h-4 w-4" />
                Share
            </Button>
        </div>
    )
}


export default function SocialFeed() {
  const { feedItems } = useSocialFeed();
  const pathname = usePathname();
  const isExplorePage = pathname === '/dashboard';

  return (
    <div className="space-y-8">
      {isExplorePage && (
         <Card className="bg-transparent shadow-none border-none">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">BlueVault Feed</CardTitle>
                <CardDescription>A live feed of updates from all stakeholders.</CardDescription>
            </CardHeader>
        </Card>
      )}
      {feedItems.map((item) => {
        const avatar = placeholderImages.find(
          (img) => img.id === item.avatarId
        );
        const postImage = item.imageId ? placeholderImages.find(
          (img) => img.id === item.imageId
        ) : null;

        return (
          <Card key={item.id} className="shadow-lg">
            <CardHeader>
              <div className="flex items-start gap-4">
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
                    {item.user.includes(' ')
                      ? item.user.split(' ')[1].charAt(0)
                      : ''}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold">{item.user}</div>
                    <div className="text-xs text-muted-foreground">
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </div>

                  </div>
                  <p className="text-xs text-muted-foreground">
                    @{item.handle.replace(' ', '')}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm">{item.content}</p>
              {postImage && (
                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                  <Image
                    src={postImage.imageUrl}
                    alt={postImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={postImage.imageHint}
                  />
                </div>
              )}
            </CardContent>
            <CardFooter>
                <PostActions />
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
