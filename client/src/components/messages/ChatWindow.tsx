import { Conversation, currentUser, Message } from "@/lib/communityData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, Check, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ChatWindowProps {
  conversation: Conversation;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(conversation.messages);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: `new-${Date.now()}`,
      senderId: 'me',
      text: messageText,
      timestamp: 'Just now',
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Mock reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: `reply-${Date.now()}`,
        senderId: conversation.participant.id,
        text: "This is a mock auto-reply! 👋",
        timestamp: 'Just now',
        status: 'delivered'
      }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-background/30 backdrop-blur-3xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-md z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
             <Avatar className="h-10 w-10 border shadow-sm">
              <AvatarImage src={conversation.participant.avatar} />
              <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
            </Avatar>
            {conversation.participant.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm">{conversation.participant.name}</h3>
            <p className="text-xs text-muted-foreground font-medium">
              {conversation.participant.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-1 text-muted-foreground">
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
            <Video className="h-5 w-5" />
          </Button>
          <div className="w-px h-5 bg-border mx-1"></div>
          <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" ref={scrollRef}>
        {messages.map((msg, index) => {
          const isMe = msg.senderId === 'me';
          const isLast = index === messages.length - 1;
          
          return (
            <div 
              key={msg.id} 
              className={cn(
                "flex w-full animate-in slide-in-from-bottom-2 duration-300", 
                isMe ? "justify-end" : "justify-start"
              )}
            >
              <div className={cn(
                "max-w-[70%] flex flex-col gap-1", 
                isMe ? "items-end" : "items-start"
              )}>
                <div 
                  className={cn(
                    "px-4 py-2.5 rounded-2xl text-sm shadow-sm relative group",
                    isMe 
                      ? "bg-primary text-primary-foreground rounded-tr-sm" 
                      : "bg-white dark:bg-muted text-foreground rounded-tl-sm border border-border/50"
                  )}
                >
                  {msg.text}
                  
                  {/* Timestamp Overlay on Hover */}
                  <div className={cn(
                    "absolute -bottom-6 text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium",
                    isMe ? "right-0" : "left-0"
                  )}>
                    {msg.timestamp}
                  </div>
                </div>
                
                {isMe && isLast && (
                  <div className="text-[10px] text-muted-foreground flex items-center gap-1 pr-1 opacity-70">
                    {msg.status === 'read' && <CheckCheck className="h-3 w-3 text-primary" />}
                    {msg.status === 'delivered' && <CheckCheck className="h-3 w-3" />}
                    {msg.status === 'sent' && <Check className="h-3 w-3" />}
                    <span className="capitalize">{msg.status}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background/80 backdrop-blur-md border-t z-10">
        <div className="flex items-end gap-2 max-w-4xl mx-auto bg-muted/50 p-2 rounded-3xl border shadow-sm focus-within:ring-1 focus-within:ring-primary/30 focus-within:bg-background transition-all">
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0">
            <Paperclip className="h-5 w-5" />
          </Button>
          
          <Input 
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..." 
            className="flex-1 border-none shadow-none focus-visible:ring-0 bg-transparent min-h-[40px] py-2 px-0 text-base placeholder:text-muted-foreground/70"
          />
          
          <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          
          <Button 
            onClick={handleSend}
            disabled={!messageText.trim()}
            className={cn(
              "h-10 w-10 rounded-full shrink-0 transition-all duration-200", 
              messageText.trim() 
                ? "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:scale-105 hover:shadow-lg" 
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
            size="icon"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
