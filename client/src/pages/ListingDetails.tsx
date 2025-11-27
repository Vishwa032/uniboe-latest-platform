import { useParams } from "wouter";
import { listings } from "@/lib/mockData";
import Sidebar from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Share, Heart, Star, MapPin, ShieldCheck, 
  Wifi, Utensils, Wind, Thermometer, Calendar, User
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { useState } from "react";

export default function ListingDetails() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id) || listings[0];
  const [date, setDate] = useState<Date | undefined>(new Date());

  if (!listing) return <div>Listing not found</div>;

  return (
    <div className="min-h-screen bg-background pb-20 pl-[4.5rem]">
      <Sidebar />
      
      <main className="container mx-auto px-4 pt-6 max-w-6xl">
        {/* Title Header */}
        <div className="space-y-4 mb-6">
          <h1 className="text-3xl font-heading font-bold">{listing.title}</h1>
          <div className="flex flex-wrap justify-between items-center gap-4 text-sm">
            <div className="flex items-center gap-2 font-medium underline cursor-pointer">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{listing.rating}</span>
              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>{listing.reviewsCount} reviews</span>
              <span className="w-1 h-1 bg-muted-foreground rounded-full" />
              <span>{listing.location}</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost" size="sm" className="gap-2 underline decoration-1 underline-offset-2 hover:no-underline">
                <Share className="h-4 w-4" /> Share
              </Button>
              <Button variant="ghost" size="sm" className="gap-2 underline decoration-1 underline-offset-2 hover:no-underline">
                <Heart className="h-4 w-4" /> Save
              </Button>
            </div>
          </div>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-10 relative">
          <div className="md:col-span-2 md:row-span-2 h-full">
            <img src={listing.images[0]} alt="Main" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          <div className="hidden md:block h-full">
            <img src={listing.images[1]} alt="Sub 1" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          <div className="hidden md:block h-full rounded-tr-2xl">
            <img src={listing.images[2]} alt="Sub 2" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          <div className="hidden md:block h-full">
            <img src={listing.images[0]} alt="Sub 3" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          <div className="hidden md:block h-full rounded-br-2xl">
            <img src={listing.images[1]} alt="Sub 4" className="w-full h-full object-cover hover:opacity-95 transition-opacity cursor-pointer" />
          </div>
          
          <Button variant="secondary" className="absolute bottom-4 right-4 gap-2 shadow-md border border-black/10">
             Show all photos
          </Button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Main Info */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Host Info */}
            <div className="flex justify-between items-center py-4 border-b">
              <div>
                <h2 className="text-xl font-semibold">Hosted by {listing.host.name}</h2>
                <p className="text-muted-foreground">
                  {listing.bedrooms} bedrooms · {listing.bathrooms} baths · {listing.type}
                </p>
              </div>
              <Avatar className="h-14 w-14">
                <AvatarImage src={listing.host.avatar} />
                <AvatarFallback>
                  {listing.host.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Key Features */}
            <div className="space-y-6 border-b pb-8">
              <div className="flex gap-4">
                <div className="mt-1"><ShieldCheck className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-semibold">Verified Student Housing</h3>
                  <p className="text-muted-foreground text-sm">Verified for safety and university proximity.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><MapPin className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-semibold">Great Location</h3>
                  <p className="text-muted-foreground text-sm">100% of recent guests gave the location a 5-star rating.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="mt-1"><Calendar className="h-6 w-6" /></div>
                <div>
                  <h3 className="font-semibold">Academic Lease Terms</h3>
                  <p className="text-muted-foreground text-sm">Lease aligns with university semester dates.</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="border-b pb-8 space-y-4">
              <p className="leading-relaxed text-muted-foreground">
                {listing.description}
              </p>
              <Button variant="link" className="p-0 font-semibold text-foreground underline">
                Show more
              </Button>
            </div>

            {/* Amenities */}
            <div className="border-b pb-8">
              <h2 className="text-xl font-semibold mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3 text-muted-foreground">
                    {amenity === 'Wifi' && <Wifi className="h-5 w-5" />}
                    {amenity === 'Kitchen' && <Utensils className="h-5 w-5" />}
                    {amenity === 'Air conditioning' && <Wind className="h-5 w-5" />}
                    {amenity === 'Heating' && <Thermometer className="h-5 w-5" />}
                    {!['Wifi', 'Kitchen', 'Air conditioning', 'Heating'].includes(amenity) && <Star className="h-5 w-5" />}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="mt-8 rounded-lg font-semibold">
                Show all {listing.amenities.length} amenities
              </Button>
            </div>
            
          </div>

          {/* Booking Card - Sticky */}
          <div className="relative">
            <div className="sticky top-24">
              <Card className="shadow-xl border-muted-foreground/20 rounded-2xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-baseline">
                    <div>
                      <span className="text-2xl font-bold">${listing.price}</span>
                      <span className="text-muted-foreground"> month</span>
                    </div>
                    <div className="text-sm font-medium flex items-center gap-1">
                       <Star className="h-3 w-3 fill-primary text-primary" />
                       {listing.rating} · <span className="text-muted-foreground underline">{listing.reviewsCount} reviews</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 border rounded-xl overflow-hidden">
                    <div className="p-3 border-r border-b">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground block">Move-in</label>
                      <span className="text-sm">Sep 1, 2025</span>
                    </div>
                    <div className="p-3 border-b">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground block">Move-out</label>
                      <span className="text-sm">May 31, 2026</span>
                    </div>
                    <div className="col-span-2 p-3">
                      <label className="text-[10px] font-bold uppercase text-muted-foreground block">Guests</label>
                      <span className="text-sm">1 student</span>
                    </div>
                  </div>
                  
                  <Button className="w-full h-12 text-lg font-bold rounded-lg bg-primary hover:bg-primary/90">
                    Reserve
                  </Button>
                  
                  <p className="text-center text-xs text-muted-foreground">
                    You won't be charged yet
                  </p>
                  
                  <div className="space-y-3 pt-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span className="underline">${listing.price} x 9 months</span>
                      <span>${listing.price * 9}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span className="underline">Service fee</span>
                      <span>$0</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${listing.price * 9}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
