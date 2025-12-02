import { Post } from "@/lib/communityData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn, formatTimestamp } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const queryClient = useQueryClient();

  // Handle different data formats from backend (cast to any for flexibility)
  const postData = post as any;

  const [liked, setLiked] = useState(postData.is_liked_by_current_user || false);
  const [likesCount, setLikesCount] = useState(postData.like_count || post.likes || 0);

  const author = post.author || {
    name: postData.user?.full_name || postData.user_name || 'Unknown User',
    avatar: postData.user?.profile_picture_url || postData.user_avatar || 'https://github.com/shadcn.png',
    isVerified: postData.user?.is_verified || false
  };
  const comments = post.comments || [];
  const commentsCount = postData.comment_count || comments.length || 0;

  // Handle backend media_urls array or mock image field
  const hasMedia = (postData.media_urls && postData.media_urls.length > 0) || post.image;
  const mediaUrls = postData.media_urls || (post.image ? [post.image] : []);
  const mediaTypes = postData.media_types || (post.image ? ['image'] : []);

  // Mutation for liking/unliking posts
  const likeMutation = useMutation({
    mutationFn: () => api.post(endpoints.feed.like(post.id)),
    onSuccess: () => {
      // Invalidate feed query to refetch posts with updated like status
      queryClient.invalidateQueries({ queryKey: ['feed', 'list'] });
      queryClient.invalidateQueries({ queryKey: ['feed', 'user-posts'] });
    },
    onError: (error) => {
      console.error('Failed to toggle like:', error);
      // Revert optimistic update on error
      setLiked(!liked);
      setLikesCount(liked ? likesCount + 1 : likesCount - 1);
    },
  });

  const handleLike = async () => {
    // Optimistic update
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);

    // Send to backend
    try {
      await likeMutation.mutateAsync();
    } catch (error) {
      // Error handling is done in onError callback
    }
  };

  return (
    <Card className="border-b border-x-0 border-t-0 rounded-none shadow-none bg-muted/5">
      <div className="flex gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-10 w-10 border cursor-pointer">
            <AvatarImage src={author.avatar} />
            <AvatarFallback>{author.name[0]}</AvatarFallback>
          </Avatar>
          {comments.length > 0 && (
            <div className="w-0.5 h-full bg-border/50 rounded-full mt-2" />
          )}
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm hover:underline cursor-pointer">
                {author.name}
              </span>
              {author.isVerified && (
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-500/10" />
              )}
              <span className="text-muted-foreground text-sm">
                {postData.created_at ? formatTimestamp(postData.created_at) : (post.timestamp || 'Just now')}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {/* Display images from backend media_urls or mock image field */}
          {hasMedia && mediaUrls.length > 0 && (
            <div className="mt-3 space-y-2">
              {mediaUrls.map((url: string, index: number) => {
                const mediaType = mediaTypes[index] || 'image';
                if (mediaType === 'image') {
                  return (
                    <div key={index} className="rounded-xl overflow-hidden border">
                      <img
                        src={url}
                        alt={`Post media ${index + 1}`}
                        className="w-full max-h-[500px] object-cover"
                      />
                    </div>
                  );
                }
                return null;
              })}
            </div>
          )}

          {post.type === 'poll' && post.pollOptions && (
            <div className="mt-3 space-y-2">
              {post.pollOptions.map((option, index) => {
                const totalVotes = post.pollOptions!.reduce((acc, curr) => acc + curr.votes, 0);
                const percentage = Math.round((option.votes / totalVotes) * 100);
                return (
                  <div key={index} className="relative h-10 rounded-lg border overflow-hidden cursor-pointer hover:bg-muted/50 transition-colors">
                    <div 
                      className="absolute top-0 left-0 h-full bg-muted-foreground/10 transition-all duration-500" 
                      style={{ width: `${percentage}%` }} 
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-4 text-sm">
                      <span className="font-medium">{option.text}</span>
                      <span className="text-muted-foreground">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
              <p className="text-xs text-muted-foreground pt-1">
                {post.pollOptions.reduce((acc, curr) => acc + curr.votes, 0)} votes · 6 hours left
              </p>
            </div>
          )}

          <div className="flex gap-6 mt-3 -ml-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn("gap-1.5 rounded-full h-9 px-2 hover:text-primary hover:bg-primary/10 transition-all", liked && "text-primary")}
              onClick={handleLike}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} />
              <span className="text-sm tabular-nums">{likesCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full h-9 px-2 hover:text-primary hover:bg-primary/10 transition-all">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm tabular-nums">{commentsCount}</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full h-9 px-2 hover:text-primary hover:bg-primary/10 transition-all">
              <Repeat className="h-5 w-5" />
              <span className="text-sm tabular-nums">{post.shares || 0}</span>
            </Button>

            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full h-9 px-2 ml-auto hover:text-primary hover:bg-primary/10 transition-all">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
