import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Users,
  MessageCircle,
  Shield,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import heroImage from '@assets/generated_images/students_studying_in_library.png';
import communityScreenshot from '@assets/generated_images/community-new.png';
import housingScreenshot from '@assets/generated_images/housing.png';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/5">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-border/50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">U</span>
              </div>
              <span className="font-heading text-2xl font-bold text-primary">Uniboe</span>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                How It Works
              </a>
              <a href="#about" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                About
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/auth">
                <Button variant="ghost" className="text-sm font-semibold hover:bg-muted">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold shadow-md">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }} />

        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">
                <Shield className="h-4 w-4" />
                Verified Student Housing
              </div>

              <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight">
                Your life abroad,{" "}
                <span className="text-primary">simplified.</span>
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Connect with student community, find verified housing, and get AI-powered assistance for all your needs. Everything you need in one place.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-6 text-base shadow-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="font-semibold px-8 py-6 text-base border-2">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">5000+</div>
                  <div className="text-sm text-muted-foreground">Active Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">1200+</div>
                  <div className="text-sm text-muted-foreground">Verified Listings</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Universities</div>
                </div>
              </div>
            </div>

            {/* Right Column - App Preview */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <div className="relative flex gap-6 items-end justify-center">
                {/* Phone Mockup - Community Feed */}
                <div className="relative w-64 transform hover:scale-105 transition-transform duration-300 -rotate-3">
                  <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      {/* Phone Notch */}
                      <div className="h-6 bg-white flex items-center justify-center">
                        <div className="w-32 h-5 bg-gray-900 rounded-full" />
                      </div>
                      {/* Community Feed Screenshot */}
                      <div className="h-[500px] overflow-hidden">
                        <img
                          src={communityScreenshot}
                          alt="Community Feed"
                          className="w-full h-auto object-contain scale-95"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Desktop/Tablet Mockup - Housing Page */}
                <div className="relative w-96 transform hover:scale-105 transition-transform duration-300 hidden md:block rotate-2">
                  <div className="bg-gray-800 rounded-2xl p-2.5 shadow-2xl">
                    <div className="bg-white rounded-xl overflow-hidden">
                      {/* Browser Bar */}
                      <div className="h-9 bg-gray-100 border-b flex items-center px-4 gap-2">
                        <div className="flex gap-1.5">
                          <div className="w-3 h-3 rounded-full bg-red-400" />
                          <div className="w-3 h-3 rounded-full bg-yellow-400" />
                          <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>
                        <div className="flex-1 bg-white rounded px-3 py-1">
                          <div className="text-[9px] text-gray-400">uniboe.com/housing</div>
                        </div>
                      </div>
                      {/* Housing Page Screenshot */}
                      <div className="h-[500px] overflow-hidden">
                        <img
                          src={housingScreenshot}
                          alt="Housing Page"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Everything You Need in One Platform
            </h2>
            <p className="text-lg text-muted-foreground">
              Uniboe brings together housing, community, and AI assistance to make your student life easier.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 - Housing */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <Home className="h-7 w-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Verified Housing</h3>
                <p className="text-muted-foreground">
                  Browse thousands of verified student housing options near your university. Safe, secure, and student-friendly.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Verified landlords</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Detailed listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Easy booking</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 - Community */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                  <Users className="h-7 w-7 text-secondary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Campus Community</h3>
                <p className="text-muted-foreground">
                  Connect with fellow students, share experiences, find roommates, and build your university network.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Student profiles</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Social feed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Find roommates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 - Messaging */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                  <MessageCircle className="h-7 w-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Direct Messaging</h3>
                <p className="text-muted-foreground">
                  Chat directly with landlords, potential roommates, and other students. Secure and private conversations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Real-time chat</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Secure messaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span>Quick responses</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 4 - AI Assistant */}
            <Card className="border-2 hover:border-primary transition-all hover:shadow-lg group">
              <CardContent className="p-6 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-secondary/20 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all">
                  <Sparkles className="h-7 w-7 text-secondary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">SAGE AI Assistant</h3>
                <p className="text-muted-foreground">
                  Get instant help with housing questions, campus life tips, and personalized recommendations from our AI.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>24/7 assistance</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Smart recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span>Instant answers</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              How Uniboe Works
            </h2>
            <p className="text-lg text-muted-foreground">
              Getting started is simple. Follow these three easy steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-foreground">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up with your university email and create your student profile. Tell us about yourself and your preferences.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-foreground">Explore & Connect</h3>
              <p className="text-muted-foreground">
                Browse verified housing listings, connect with students, and use SAGE AI to find the perfect match.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto h-16 w-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-foreground">Move In</h3>
              <p className="text-muted-foreground">
                Book your housing, finalize details with your landlord, and get ready for an amazing university experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Ready to Find Your Perfect Student Home?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their ideal housing through Uniboe.
          </p>
          <Link href="/auth">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-10 py-7 text-lg shadow-2xl">
              Get Started Free
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
                <span className="font-heading text-xl font-bold">Uniboe</span>
              </div>
              <p className="text-sm text-white/70">
                The all-in-one platform for student housing and campus community.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Housing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-white transition-colors">SAGE AI</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Messages</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/60">
            © 2025 Uniboe. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
