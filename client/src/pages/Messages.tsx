import Sidebar from "@/components/layout/Sidebar";
import ChatList from "@/components/messages/ChatList";
import ChatWindow from "@/components/messages/ChatWindow";
import { conversations } from "@/lib/communityData";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Messages() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Fetch conversations from backend
  const { data: backendConversations, isLoading, error } = useQuery({
    queryKey: ['chat', 'conversations'],
    queryFn: () => api.get(endpoints.chat.conversations),
    retry: false,
  });

  // Search for users
  const { data: searchResults, isLoading: isSearching } = useQuery({
    queryKey: ['users', 'search', searchQuery],
    queryFn: () => api.get(`/api/chat/users/search?q=${encodeURIComponent(searchQuery)}`),
    enabled: searchQuery.length > 0,
    retry: false,
  });

  // Create new conversation
  const createConversationMutation = useMutation({
    mutationFn: (userId: string) => api.post('/api/chat/conversations', { participant_id: userId }),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] });
      setShowSearch(false);
      setSearchQuery("");

      // Select the new conversation
      if (data && data.id) {
        setSelectedConvId(data.id);
      }

      toast({
        title: "Conversation started",
        description: "You can now send messages",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Failed to start conversation",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  // Debug logging
  if (error) {
    console.log('Messages page error:', error);
  }
  if (backendConversations) {
    console.log('Conversations from backend:', backendConversations);
  }

  // Use backend data if available, otherwise fall back to mock data
  // Backend might return data in {conversations: [...]} or {data: [...]} format
  let displayConversations = conversations; // default to mock
  if (backendConversations) {
    if (Array.isArray(backendConversations)) {
      displayConversations = backendConversations;
    } else if (backendConversations.conversations && Array.isArray(backendConversations.conversations)) {
      displayConversations = backendConversations.conversations;
    } else if (backendConversations.data && Array.isArray(backendConversations.data)) {
      displayConversations = backendConversations.data;
    }
  }

  const [selectedConvId, setSelectedConvId] = useState<string | undefined>(displayConversations[0]?.id);
  const selectedConv = displayConversations.find((c: any) => c.id === selectedConvId) || displayConversations[0];

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col bg-background overflow-hidden pl-[4.5rem] items-center justify-center">
        <Sidebar />
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading conversations...</div>
        </div>
      </div>
    );
  }

  // If no conversations exist, show search interface
  if (!displayConversations || displayConversations.length === 0) {
    return (
      <div className="h-screen flex flex-col bg-background overflow-hidden pl-[4.5rem]">
        <Sidebar />
        <main className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full border-x shadow-2xl my-4 rounded-2xl border-y bg-background/95 backdrop-blur-xl">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-foreground mb-4">Messages</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search for people to message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {isSearching ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Searching...</p>
              </div>
            ) : searchQuery && searchResults?.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((user: any) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => createConversationMutation.mutate(user.id)}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={user.profile_picture_url || 'https://github.com/shadcn.png'} />
                      <AvatarFallback>{user.full_name?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{user.full_name}</div>
                      <div className="text-sm text-muted-foreground">{user.university_email || user.email}</div>
                    </div>
                    <MessageCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            ) : searchQuery && searchResults?.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No users found</p>
              </div>
            ) : (
              <div className="text-center py-16">
                <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <div className="text-2xl font-bold text-foreground mb-2">No conversations yet</div>
                <p className="text-muted-foreground">Search for people above to start a conversation</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden pl-[4.5rem]">
      <Sidebar />

      <main className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full border-x shadow-2xl my-4 rounded-2xl border-y bg-background/95 backdrop-blur-xl">
        {/* Chat list with search toggle */}
        <div className="w-80 border-r flex flex-col">
          <div className="p-4 border-b space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-lg">Messages</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(!showSearch)}
                className="h-8 w-8 p-0"
              >
                {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>

            {showSearch && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search people..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Show search results or conversation list */}
          {showSearch && searchQuery ? (
            <div className="flex-1 overflow-y-auto p-2">
              {isSearching ? (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">Searching...</p>
                </div>
              ) : searchResults?.length > 0 ? (
                <div className="space-y-1">
                  {searchResults.map((user: any) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => createConversationMutation.mutate(user.id)}
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.profile_picture_url || 'https://github.com/shadcn.png'} />
                        <AvatarFallback>{user.full_name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground truncate">{user.full_name}</div>
                        <div className="text-xs text-muted-foreground truncate">{user.university_email || user.email}</div>
                      </div>
                      <MessageCircle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">No users found</p>
                </div>
              )}
            </div>
          ) : (
            <ChatList
              conversations={displayConversations}
              selectedId={selectedConvId}
              onSelect={setSelectedConvId}
            />
          )}
        </div>

        <div className="flex-1 bg-muted/10">
          {selectedConv ? (
            <ChatWindow conversation={selectedConv} />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Select a conversation to start chatting</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
