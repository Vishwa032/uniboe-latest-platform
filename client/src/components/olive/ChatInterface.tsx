import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Mic, Image as ImageIcon, Sparkles, StopCircle } from "lucide-react";
import { generateOliveResponse, OliveMessage } from "@/lib/oliveAI";
import { cn } from "@/lib/utils";
import ListingCard from "@/components/listing/ListingCard";
import PostCard from "@/components/community/PostCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Listing } from "@/lib/mockData";
import { Post } from "@/lib/communityData";
interface ChatInterfaceProps {
  sidebarOpen: boolean;
}

export default function ChatInterface({ sidebarOpen }: ChatInterfaceProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<OliveMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    "Find cheap apartments near Columbia",
    "Show me posts from NYU students",
    "What should I ask during viewing?",
    "Compare dorms vs off-campus"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: OliveMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      type: 'text',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMsg]);
    const messageContent = input;
    setInput("");
    setIsThinking(true);

    // Use mock AI for now (backend returns text, we want rich content with post cards)
    try {
      const response = await generateOliveResponse(messageContent);
      setIsThinking(false);
      setMessages(prev => [...prev, response]);
    } catch (mockError) {
      setIsThinking(false);
      // Show error message
      const errorMsg: OliveMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'text',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className={cn(
      "flex-1 flex flex-col h-screen transition-all duration-300 ease-in-out relative",
      sidebarOpen ? "ml-64" : "ml-0"
    )}>
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
            <div className="h-20 w-20 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Sparkles className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Hello, I'm SAGE
              </h1>
              <p className="text-xl text-muted-foreground">
                Your personal student housing assistant. Ask me anything.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {suggestedPrompts.map((prompt) => (
                <Button 
                  key={prompt}
                  variant="outline" 
                  className="h-auto py-4 px-6 text-left justify-start text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all"
                  onClick={() => handlePromptClick(prompt)}
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-8 pb-4">
            {messages.map((msg) => (
              <div key={msg.id} className={cn("flex gap-4", msg.role === 'assistant' ? "bg-muted/30 -mx-4 px-4 py-6 rounded-xl" : "")}>
                <Avatar className={cn("h-8 w-8 mt-1", msg.role === 'assistant' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  {msg.role === 'assistant' ? (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-primary to-purple-600">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <AvatarImage src="https://github.com/shadcn.png" />
                  )}
                  <AvatarFallback>{msg.role === 'assistant' ? 'AI' : 'U'}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 space-y-4 overflow-hidden">
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-base">
                      {msg.content}
                    </p>
                  </div>

                  {msg.type === 'listings' && msg.data && (
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                       {(msg.data as Listing[]).map(listing => (
                         <div key={listing.id} className="transform scale-95 origin-top-left w-full">
                           <ListingCard listing={listing} />
                         </div>
                       ))}
                     </div>
                  )}

                  {msg.type === 'posts' && msg.data && (
                    <div className="space-y-4 mt-4">
                      {(msg.data as Post[]).map(post => (
                        <div key={post.id} className="border rounded-xl overflow-hidden bg-background">
                          <PostCard post={post} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isThinking && (
              <div className="flex gap-4 bg-muted/30 -mx-4 px-4 py-6 rounded-xl">
                 <div className="h-8 w-8 mt-1 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-purple-600">
                    <Sparkles className="h-4 w-4 text-white animate-pulse" />
                 </div>
                 <div className="flex items-center gap-1 h-6">
                   <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                   <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                   <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                 </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 md:p-6 bg-background/80 backdrop-blur-lg border-t z-10">
        <div className="max-w-3xl mx-auto relative">
          <div className={cn(
            "flex flex-col bg-muted/50 border rounded-2xl shadow-sm focus-within:ring-1 focus-within:ring-primary/30 focus-within:bg-background transition-all overflow-hidden",
            isThinking && "opacity-50 pointer-events-none"
          )}>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask SAGE about housing, roommates, or campus life..."
              className="w-full bg-transparent border-none focus:ring-0 resize-none min-h-[60px] max-h-[200px] p-4 text-base"
              rows={1}
            />
            
            <div className="flex justify-between items-center px-3 pb-3">
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary text-muted-foreground">
                  <ImageIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary text-muted-foreground">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleSend}
                disabled={!input.trim() || isThinking}
                size="icon"
                className={cn(
                  "h-8 w-8 rounded-lg transition-all",
                  input.trim() ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}
              >
                {isThinking ? <StopCircle className="h-4 w-4" /> : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <p className="text-center text-[10px] text-muted-foreground mt-2">
            SAGE can make mistakes. Please verify important housing information.
          </p>
        </div>
      </div>
    </div>
  );
}
