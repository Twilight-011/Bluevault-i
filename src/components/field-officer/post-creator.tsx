
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Card, CardContent, CardDescription, CardHeader, CardTitle, Textarea, Input } from '@/components/ui';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useSocialFeed } from '@/context/social-feed-context';

const formSchema = z.object({
  postContent: z.string().min(10, {
    message: 'Post must be at least 10 characters.',
  }).max(280, {
    message: 'Post must not be longer than 280 characters.'
  }),
  postImage: z.any().optional(),
});

export function PostCreator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { addFeedItem } = useSocialFeed();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postContent: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
        addFeedItem({
            user: 'Rajesh Kumar',
            handle: 'Field Officer',
            avatarId: 'avatar-2',
            content: values.postContent,
            imageId: values.postImage ? 'post-image-upload' : undefined
        });
      toast({
        title: 'Post Published',
        description: 'Your update is now live on the social feed.',
      });
      form.reset();
      setIsLoading(false);
    }, 1000);
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Send className="h-6 w-6" /> Create a Post
        </CardTitle>
        <CardDescription>
          Share an update with the project stakeholders.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="postContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Update</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What's happening in the field today?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="postImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attach Image</FormLabel>
                  <FormControl>
                    <div className="relative">
                       <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                       <Input type="file" className="pl-10" {...field} />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className='w-full'>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                'Post Update'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
