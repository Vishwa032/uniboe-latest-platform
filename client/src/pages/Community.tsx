import Sidebar from "@/components/layout/Sidebar";
import PostCard from "@/components/community/PostCard";
import CreatePost from "@/components/community/CreatePost";
import { posts, currentUser, users } from "@/lib/communityData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Search, UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import adImage from '@/../../apple-back-to-school-promotion (1).webp';
import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

export default function Community() {
  // Fetch community feed from backend
  const { data: backendPosts, isLoading, error } = useQuery({
    queryKey: ['feed', 'list'],
    queryFn: () => api.get(endpoints.feed.list),
    retry: false,
  });

  // Debug logging
  if (error) {
    console.log('Community page error:', error);
  }
  if (backendPosts) {
    console.log('Community posts from backend:', backendPosts);
  }

  // Use backend data if available, otherwise fall back to mock data
  // Backend might return data in {posts: [...]} or {data: [...]} format
  let displayPosts = posts; // default to mock
  if (backendPosts) {
    if (Array.isArray(backendPosts)) {
      displayPosts = backendPosts;
    } else if (backendPosts.posts && Array.isArray(backendPosts.posts)) {
      displayPosts = backendPosts.posts;
    } else if (backendPosts.data && Array.isArray(backendPosts.data)) {
      displayPosts = backendPosts.data;
    }
  }

  return (
    <div className="min-h-screen bg-white pl-[4.5rem]">
      <Sidebar />

      <main className="container mx-auto px-4 pt-6 pb-20 max-w-6xl flex gap-8 justify-center">

        {/* Main Feed */}
        <div className="flex-1 max-w-xl w-full">
          <Tabs defaultValue="foryou" className="w-full mb-6">
            <div className="flex justify-between items-center mb-4 px-2">
              <h1 className="text-2xl font-heading font-bold text-foreground">Community</h1>
              <TabsList className="bg-muted/50">
                <TabsTrigger value="foryou" className="rounded-sm px-6 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">For You</TabsTrigger>
                <TabsTrigger value="following" className="rounded-sm px-6 data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Following</TabsTrigger>
              </TabsList>
            </div>

            <div className="bg-background border rounded-xl overflow-hidden shadow-sm mb-6">
              <CreatePost />
            </div>

            <TabsContent value="foryou" className="space-y-0 mt-0 border rounded-xl overflow-hidden shadow-sm bg-background">
              {isLoading ? (
                <div className="text-center py-10">
                  <div className="text-lg text-muted-foreground">Loading posts...</div>
                </div>
              ) : (
                displayPosts.map((post: any) => (
                  <PostCard key={post.id} post={post} />
                ))
              )}
            </TabsContent>
            
            <TabsContent value="following" className="mt-0">
              <div className="text-center py-10 text-muted-foreground">
                <p>Follow more people to see their posts here!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block w-80 space-y-6 sticky top-24 h-fit">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search topics" className="pl-9 bg-muted/30 border-none shadow-sm" />
          </div>

          {/* Advertisement */}
          <Card className="shadow-sm border-border/60 bg-card overflow-hidden">
            <CardContent className="p-0">
              <img
                src={adImage}
                alt="Back to School Promotion"
                className="w-full h-auto object-cover cursor-pointer hover:opacity-95 transition-opacity"
              />
              <div className="px-4 py-2 bg-muted/30 text-center">
                <p className="text-xs text-muted-foreground">Sponsored</p>
              </div>
            </CardContent>
          </Card>

          {/* Suggested Users */}
          <Card className="shadow-sm border-border/60 bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-bold flex items-center gap-2 text-foreground">
                <UserPlus className="h-4 w-4 text-foreground" /> Suggested for you
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {users.slice(1, 4).map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium truncate w-24">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{user.handle}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 px-3 rounded-full font-semibold bg-foreground/10 border-foreground text-foreground hover:bg-primary hover:text-primary-foreground hover:border-foreground transition-all">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground flex flex-wrap gap-2 px-2">
             <span className="cursor-pointer hover:underline">About</span>
             <span>·</span>
             <span className="cursor-pointer hover:underline">Help</span>
             <span>·</span>
             <span className="cursor-pointer hover:underline">Privacy</span>
             <span>·</span>
             <span className="cursor-pointer hover:underline">Terms</span>
             <span>·</span>
             <span>© 2025 Uniboe</span>
          </div>
        </div>

      </main>
    </div>
  );
}
