import { Conversation, Message } from "@/lib/communityData";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Video, MoreVertical, Send, Paperclip, Smile, Check, CheckCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

interface ChatWindowProps {
  conversation: Conversation;
}

export default function ChatWindow({ conversation }: ChatWindowProps) {
  const queryClient = useQueryClient();

  // Handle different data formats from backend (cast to any for flexibility)
  const convData = conversation as any;

  // Backend uses other_participant, mock uses participant
  const participant = conversation?.participant || (convData?.other_participant ? {
    id: convData.other_participant.id || 'unknown',
    name: convData.other_participant.full_name || 'Unknown User',
    avatar: convData.other_participant.profile_picture_url || 'https://github.com/shadcn.png',
    online: false
  } : {
    id: 'unknown',
    name: 'Unknown User',
    avatar: 'https://github.com/shadcn.png',
    online: false
  });

  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<Message[]>(conversation.messages || []);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch current user to identify which messages are "mine"
  const { data: currentUser } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get(endpoints.auth.me),
    retry: false,
  });

  // Fetch messages from backend if conversation doesn't have messages array
  const { data: backendMessages, isLoading, error: messagesError } = useQuery({
    queryKey: ['chat', 'messages', conversation.id],
    queryFn: () => api.get(endpoints.chat.messages(conversation.id)),
    retry: false,
    enabled: !conversation.messages || conversation.messages.length === 0,
  });

  // Debug logging
  if (messagesError) {
    console.log('ChatWindow messages error:', messagesError);
  }
  if (backendMessages) {
    console.log('ChatWindow messages from backend:', backendMessages);
  }

  // Update messages when conversation changes or backend data arrives
  useEffect(() => {
    if (conversation.messages && conversation.messages.length > 0) {
      // Use mock messages
      setMessages(conversation.messages);
    } else if (backendMessages) {
      // Convert backend messages to Message format
      // Backend might return {messages: [...]} or direct array
      const msgArray = backendMessages.messages || backendMessages.data || (Array.isArray(backendMessages) ? backendMessages : []);
      console.log('Converting messages:', msgArray);

      const convertedMessages = msgArray.map((msg: any) => ({
        id: msg.id,
        senderId: msg.sender_id,
        text: msg.content,
        timestamp: new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: msg.is_read ? 'read' : 'delivered',
      }));

      // Backend returns messages newest first (DESC), reverse for chat display (oldest first)
      const orderedMessages = convertedMessages.reverse();
      console.log('Converted messages (oldest first):', orderedMessages);
      setMessages(orderedMessages);
    }
  }, [conversation, backendMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Mutation for sending messages
  const sendMessageMutation = useMutation({
    mutationFn: (content: string) =>
      api.post(endpoints.chat.send(conversation.id), { content }),
    onSuccess: (data) => {
      console.log('Message sent successfully:', data);
      // Invalidate messages query to refetch
      queryClient.invalidateQueries({ queryKey: ['chat', 'messages', conversation.id] });
      queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] });
    },
    onError: (error) => {
      console.error('Failed to send message:', error);
      // TODO: Show error toast to user
    },
  });

  const handleSend = async () => {
    if (!messageText.trim()) return;

    const messageContent = messageText.trim();
    setMessageText(""); // Clear input immediately for better UX

    // Optimistically add message to UI
    const optimisticMessage: Message = {
      id: `temp-${Date.now()}`,
      senderId: 'me',
      text: messageContent,
      timestamp: 'Just now',
      status: 'sent',
    };

    setMessages(prev => [...prev, optimisticMessage]);

    // Send to backend
    try {
      await sendMessageMutation.mutateAsync(messageContent);
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove optimistic message on error
      setMessages(prev => prev.filter(m => m.id !== optimisticMessage.id));
    }
  };

  return (
    <div className="flex flex-col h-full bg-background/30 backdrop-blur-3xl relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      {/* Header */}
      <div className="h-16 border-b flex items-center justify-between px-6 bg-background/80 backdrop-blur-md z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
             <Avatar className={cn(
               "h-10 w-10 border shadow-sm",
               participant.online && "ring-2 ring-secondary ring-offset-2 ring-offset-background"
             )}>
              <AvatarImage src={participant.avatar} />
              <AvatarFallback>{participant.name[0]}</AvatarFallback>
            </Avatar>
            {participant.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-sm">{participant.name}</h3>
            <p className="text-xs text-muted-foreground font-medium">
              {participant.online ? 'Online' : 'Offline'}
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
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">Loading messages...</div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-muted-foreground">No messages yet. Start the conversation!</div>
          </div>
        ) : (
          messages.map((msg, index) => {
          // Check if message is from current user (handle both mock 'me' and real user ID)
          const isMe = msg.senderId === 'me' || (currentUser && msg.senderId === currentUser.id);
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
        }))}
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
                ? "shadow-md hover:scale-105 hover:shadow-lg"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            )}
            style={messageText.trim() ? {
              backgroundColor: 'hsl(266, 45%, 80%)',
              color: 'hsl(17, 22%, 34%)'
            } : undefined}
            size="icon"
          >
            <Send className="h-5 w-5 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
