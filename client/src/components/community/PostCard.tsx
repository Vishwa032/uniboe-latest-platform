import { Post } from "@/lib/communityData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Heart, MessageCircle, Repeat, Share, MoreHorizontal, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="border-b border-x-0 border-t-0 rounded-none shadow-none hover:bg-muted/5 transition-colors">
      <div className="flex gap-4 p-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar className="h-10 w-10 border cursor-pointer">
            <AvatarImage src={post.author.avatar} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          {post.comments.length > 0 && (
            <div className="w-0.5 h-full bg-border/50 rounded-full mt-2" />
          )}
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm hover:underline cursor-pointer">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 fill-blue-500/10" />
              )}
              <span className="text-muted-foreground text-sm">
                {post.timestamp}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>

          {post.type === 'image' && post.image && (
            <div className="mt-3 rounded-xl overflow-hidden border">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full max-h-[500px] object-cover"
              />
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
              className={cn("gap-1.5 rounded-full h-9 px-2 hover:text-red-500 hover:bg-red-500/10", liked && "text-red-500")}
              onClick={handleLike}
            >
              <Heart className={cn("h-5 w-5", liked && "fill-current")} />
              <span className="text-sm tabular-nums">{likesCount}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full h-9 px-2 hover:text-blue-500 hover:bg-blue-500/10">
              <MessageCircle className="h-5 w-5" />
              <span className="text-sm tabular-nums">{post.comments.length}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full h-9 px-2 hover:text-green-500 hover:bg-green-500/10">
              <Repeat className="h-5 w-5" />
              <span className="text-sm tabular-nums">{post.shares}</span>
            </Button>
            
            <Button variant="ghost" size="sm" className="gap-1.5 rounded-full h-9 px-2 ml-auto">
              <Share className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
