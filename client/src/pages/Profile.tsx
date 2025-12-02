import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Edit2, GraduationCap, Calendar, Users, Home } from "lucide-react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

export default function Profile() {
  // Fetch real profile data from backend
  const { data: profile, isLoading, error } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: () => api.get(endpoints.profile.me),
    retry: false,
  });

  // Fetch user's posts from backend
  const { data: userPostsData, isLoading: postsLoading } = useQuery({
    queryKey: ['feed', 'user-posts', profile?.id],
    queryFn: () => api.get(endpoints.feed.userPosts(profile.id)),
    retry: false,
    enabled: !!profile?.id,
  });

  // Fetch user's stats (posts count, listings count, connections count)
  const { data: userStats } = useQuery({
    queryKey: ['profile', 'stats'],
    queryFn: () => api.get(endpoints.profile.stats),
    retry: false,
    enabled: !!profile?.id,
  });

  // Debug logging
  if (error) {
    console.log('Profile page error:', error);
  }
  if (profile) {
    console.log('Profile page data:', profile);
  }
  if (userPostsData) {
    console.log('User posts:', userPostsData);
  }
  if (userStats) {
    console.log('User stats:', userStats);
  }

  // Extract posts array from backend response
  const backendPosts = userPostsData?.posts || [];

  // Mock user data as fallback
  const userData = {
    name: profile?.full_name || "Alex Student",
    avatar: profile?.profile_picture_url || "https://github.com/shadcn.png",
    coverImage: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000",
    university: profile?.university_name || profile?.university?.name || "Stevens Institute of Technology",
    major: profile?.major || "Data Science",
    graduationYear: profile?.graduation_year || "2026",
    bio: profile?.bio || "Passionate about data science and machine learning. Love to explore new technologies and work on innovative projects. Always looking to connect with like-minded individuals and collaborate on exciting ventures.",
    verified: profile?.is_verified || false,
    postsCount: userStats?.posts_count || 0,
    listingsCount: userStats?.listings_count || 0,
    connectionsCount: userStats?.connections_count || 0,
    interests: profile?.interests || ["Trekking", "Camping", "Swimming", "Gym", "Photography", "Music"],
    posts: backendPosts,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white pl-[4.5rem] flex items-center justify-center">
        <Sidebar />
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading profile...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white pl-[4.5rem]">
      <Sidebar />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">U</span>
            </div>
            <span className="font-heading text-xl font-bold text-primary">Uniboe</span>
          </div>
        </Link>
        <Link href="/profile/edit">
          <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground gap-2">
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        </Link>
      </header>

      <main className="max-w-6xl mx-auto pb-20">
        {/* Hero Section */}
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-80 w-full overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
            <img
              src={userData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
              style={{ filter: 'blur(2px)' }}
            />
          </div>

          {/* Avatar & Basic Info */}
          <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2">
            <div className="text-center">
              <div className="relative inline-block group">
                <div className="h-40 w-40 rounded-full border-4 border-white bg-background overflow-hidden shadow-xl mx-auto">
                  <img
                    src={userData.avatar}
                    alt={userData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <Edit2 className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Name & University Info */}
        <div className="mt-24 text-center px-6 space-y-3">
          <h1 className="text-4xl font-heading font-bold text-foreground">{userData.name}</h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <GraduationCap className="h-5 w-5" />
            <span className="text-lg">{userData.major} • {userData.university}</span>
          </div>
          {userData.verified && (
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-semibold">
              <Shield className="h-4 w-4 fill-current" />
              <span>Verified Student</span>
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">{userData.postsCount}</p>
              </div>
              <p className="text-sm text-muted-foreground">Posts</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <Home className="h-4 w-4 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">{userData.listingsCount}</p>
              </div>
              <p className="text-sm text-muted-foreground">Listings</p>
            </div>
            <div className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-2xl font-bold text-foreground">{userData.connectionsCount}</p>
              </div>
              <p className="text-sm text-muted-foreground">Connections</p>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mt-12">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* About Me */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">About Me</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{userData.bio}</p>
              </CardContent>
            </Card>

            {/* Interests & Hobbies */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Interests & Hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest: string) => (
                    <span
                      key={interest}
                      className="px-4 py-2 rounded-full border border-border bg-background hover:bg-primary/10 hover:border-primary hover:text-primary transition-all cursor-pointer text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Academic Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Academic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground block mb-1">University</label>
                    <p className="text-foreground font-medium">{userData.university}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground block mb-1">Major</label>
                    <p className="text-foreground font-medium">{userData.major}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-muted-foreground block mb-1">Graduation Year</label>
                    <div className="inline-flex items-center gap-2 bg-secondary/20 text-foreground px-3 py-1 rounded-lg font-semibold">
                      <Calendar className="h-4 w-4" />
                      {userData.graduationYear}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* My Posts */}
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">My Posts</CardTitle>
                <span className="text-sm text-muted-foreground font-medium">
                  {userData.posts.length} posts
                </span>
              </CardHeader>
              <CardContent>
                {postsLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Loading posts...</div>
                  </div>
                ) : userData.posts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <p className="text-muted-foreground">No posts yet</p>
                    <p className="text-sm text-muted-foreground mt-1">Share your first post in the Community section!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {userData.posts.map((post: any) => {
                      // Get first media URL from the post
                      const mediaUrl = post.media_urls?.[0] || post.image;
                      const mediaType = post.media_types?.[0] || 'image';

                      return (
                        <div
                          key={post.id}
                          className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative"
                        >
                          {mediaType === 'image' && mediaUrl ? (
                            <img
                              src={mediaUrl}
                              alt={`Post ${post.id}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <p className="text-sm text-muted-foreground px-4 text-center line-clamp-3">
                                {post.content}
                              </p>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
