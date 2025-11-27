import { MessageSquare, Plus, MoreHorizontal, Trash2, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockHistory, ChatSession } from "@/lib/oliveAI";
import { cn } from "@/lib/utils";

interface ChatSidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
}

export default function ChatSidebar({ isOpen, onNewChat }: ChatSidebarProps) {
  return (
    <div className={cn(
      "fixed left-[4.5rem] top-0 h-screen bg-muted/30 border-r transition-all duration-300 ease-in-out overflow-hidden flex flex-col",
      isOpen ? "w-64 opacity-100 translate-x-0" : "w-0 opacity-0 -translate-x-4"
    )}>
      <div className="p-4">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2 bg-primary/10 text-primary hover:bg-primary/20 font-medium shadow-none border-primary/20 border"
        >
          <Plus className="h-4 w-4" /> New Chat
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-6">
        {['Today', 'Yesterday', 'Previous 7 Days'].map((dateGroup) => (
          <div key={dateGroup}>
            <h3 className="px-3 text-xs font-semibold text-muted-foreground mb-2">{dateGroup}</h3>
            <div className="space-y-1">
              {mockHistory.filter(h => h.date === dateGroup).map((chat) => (
                <div 
                  key={chat.id}
                  className="group flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-muted cursor-pointer text-foreground/80 hover:text-foreground transition-colors"
                >
                  <MessageSquare className="h-4 w-4 shrink-0 opacity-50" />
                  <span className="truncate flex-1">{chat.title}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-background/50 backdrop-blur-sm">
         <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-muted cursor-pointer transition-colors">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xs">
              Pro
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Upgrade to Plus</p>
              <p className="text-[10px] text-muted-foreground">Get smarter responses</p>
            </div>
         </div>
      </div>
    </div>
  );
}
