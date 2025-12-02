import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { X, Save, Loader2 } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function EditProfile() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch current profile data
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile', 'me'],
    queryFn: () => api.get(endpoints.profile.me),
    retry: false,
  });

  // Form state
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    major: "",
    graduation_year: "",
    phone_number: "",
    interests: [] as string[],
    profile_picture_url: "",
  });

  // Current interest input
  const [currentInterest, setCurrentInterest] = useState("");

  // Update form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        bio: profile.bio || "",
        major: profile.major || "",
        graduation_year: profile.graduation_year?.toString() || "",
        phone_number: profile.phone_number || "",
        interests: profile.interests || [],
        profile_picture_url: profile.profile_picture_url || "",
      });
    }
  }, [profile]);

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: (data: any) => api.put(endpoints.profile.update, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', 'me'] });
      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      });
      setLocation("/profile");
    },
    onError: (error: any) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare data for backend
    const updateData: any = {
      full_name: formData.full_name,
      bio: formData.bio || undefined,
      major: formData.major || undefined,
      phone_number: formData.phone_number || undefined,
      interests: formData.interests.length > 0 ? formData.interests : undefined,
    };

    // Convert graduation_year to number if provided
    if (formData.graduation_year) {
      updateData.graduation_year = parseInt(formData.graduation_year);
    }

    updateProfileMutation.mutate(updateData);
  };

  const handleAddInterest = () => {
    if (currentInterest.trim() && formData.interests.length < 20) {
      setFormData({
        ...formData,
        interests: [...formData.interests, currentInterest.trim()],
      });
      setCurrentInterest("");
    }
  };

  const handleRemoveInterest = (index: number) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter((_, i) => i !== index),
    });
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
        <Link href="/profile">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">U</span>
            </div>
            <span className="font-heading text-xl font-bold text-primary">Uniboe</span>
          </div>
        </Link>
        <div className="flex gap-2">
          <Link href="/profile">
            <Button variant="outline" className="gap-2">
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </Link>
          <Button
            onClick={handleSubmit}
            disabled={updateProfileMutation.isPending}
            className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground gap-2"
          >
            {updateProfileMutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-foreground">Edit Profile</h1>
          <p className="text-muted-foreground mt-2">Update your personal information and preferences</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {formData.bio.length}/500 characters
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone_number">Phone Number</Label>
                <Input
                  id="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                  placeholder="+1-555-0100"
                />
              </div>
            </CardContent>
          </Card>

          {/* Academic Information */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Academic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="major">Major / Field of Study</Label>
                <Input
                  id="major"
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="e.g., Computer Science"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="graduation_year">Graduation Year</Label>
                <Input
                  id="graduation_year"
                  type="number"
                  value={formData.graduation_year}
                  onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                  placeholder="e.g., 2026"
                  min={new Date().getFullYear() - 10}
                  max={new Date().getFullYear() + 10}
                />
              </div>
            </CardContent>
          </Card>

          {/* Interests & Hobbies */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl">Interests & Hobbies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interest">Add Interest</Label>
                <div className="flex gap-2">
                  <Input
                    id="interest"
                    value={currentInterest}
                    onChange={(e) => setCurrentInterest(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddInterest();
                      }
                    }}
                    placeholder="e.g., Photography"
                    maxLength={50}
                  />
                  <Button
                    type="button"
                    onClick={handleAddInterest}
                    disabled={!currentInterest.trim() || formData.interests.length >= 20}
                  >
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  {formData.interests.length}/20 interests added
                </p>
              </div>

              {formData.interests.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {formData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background text-sm font-medium"
                    >
                      {interest}
                      <button
                        type="button"
                        onClick={() => handleRemoveInterest(index)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Read-only Information */}
          <Card className="shadow-lg bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl">Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-muted-foreground">University</Label>
                <p className="text-foreground font-medium">
                  {profile?.university_name || profile?.university?.name || "Not set"}
                </p>
                <p className="text-xs text-muted-foreground">
                  University information cannot be changed. It's linked to your verified university email.
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-muted-foreground">Email</Label>
                <p className="text-foreground font-medium">{profile?.email}</p>
                <p className="text-xs text-muted-foreground">
                  Email address cannot be changed
                </p>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  );
}
