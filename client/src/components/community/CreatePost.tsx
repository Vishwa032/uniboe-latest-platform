import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { currentUser } from "@/lib/communityData";
import { Image, BarChart2, Paperclip } from "lucide-react";

export default function CreatePost() {
  return (
    <div className="flex gap-4 p-4 border-b">
      <div className="flex flex-col items-center gap-2">
        <Avatar className="h-10 w-10 border">
          <AvatarImage src={currentUser.avatar} />
          <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-1 space-y-4">
        <div>
          <p className="font-semibold text-sm mb-1">{currentUser.name}</p>
          <Textarea 
            placeholder="Start a thread..." 
            className="min-h-[60px] border-none shadow-none resize-none p-0 focus-visible:ring-0 text-base bg-transparent"
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-2 text-muted-foreground">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-primary">
              <Image className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-primary">
              <BarChart2 className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:text-primary">
              <Paperclip className="h-4 w-4" />
            </Button>
          </div>
          
          <Button size="sm" className="rounded-full font-semibold px-4" disabled>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
