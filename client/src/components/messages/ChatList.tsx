import { Conversation } from "@/lib/communityData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatListProps {
  conversations: Conversation[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ChatList({ conversations, selectedId, onSelect }: ChatListProps) {
  return (
    <div className="flex flex-col h-full border-r bg-background/50 backdrop-blur-sm w-80 md:w-96">
      <div className="p-4 border-b space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-primary">Chats</h2>
          <span className="text-xs font-medium text-primary/60 bg-primary/10 px-2 py-1 rounded-full">
            {conversations.filter(c => c.unreadCount > 0).length} new
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search messages" 
            className="pl-9 bg-muted/50 border-none shadow-sm focus-visible:ring-1 focus-visible:bg-background transition-all" 
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-muted/20 hover:scrollbar-thumb-muted/50">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => onSelect(conversation.id)}
            className={cn(
              "flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-all border-l-4 border-transparent",
              selectedId === conversation.id && "bg-muted/80 border-primary shadow-inner"
            )}
          >
            <div className="relative">
              <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                <AvatarImage src={conversation.participant.avatar} />
                <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
              </Avatar>
              {conversation.participant.online && (
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-background rounded-full animate-pulse shadow-sm" />
              )}
            </div>
            
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className={cn("font-semibold truncate text-sm", selectedId === conversation.id && "text-primary")}>
                  {conversation.participant.name}
                </span>
                <span className="text-[10px] font-medium text-muted-foreground tabular-nums">
                  {conversation.lastMessageTime}
                </span>
              </div>
              <p className={cn(
                "text-sm truncate pr-2 transition-colors",
                conversation.unreadCount > 0 ? "text-foreground font-semibold" : "text-muted-foreground"
              )}>
                {conversation.messages[conversation.messages.length - 1].text}
              </p>
            </div>

            {conversation.unreadCount > 0 && (
              <div className="min-w-[20px] h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow-sm px-1.5">
                {conversation.unreadCount}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
