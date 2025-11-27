import Navbar from "@/components/layout/Navbar";
import ListingCard from "@/components/listing/ListingCard";
import ListingFilters from "@/components/listing/ListingFilters";
import { listings } from "@/lib/mockData";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from '@assets/generated_images/modern_university_housing_exterior_with_students.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      {/* Hero Section (Optional, but good for "Student" branding) */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden hidden md:block">
        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-heading font-bold drop-shadow-lg">
              Find your home away from home
            </h1>
            <p className="text-lg md:text-xl font-medium drop-shadow-md">
              Verified student housing near top universities
            </p>
          </div>
        </div>
        <img 
          src={heroImage} 
          alt="University Campus" 
          className="w-full h-full object-cover"
        />
      </div>

      <main className="container mx-auto px-4 pt-8">
        <ListingFilters />
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </main>

      {/* Floating Map Toggle */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Button 
          className="rounded-full bg-foreground text-background hover:bg-foreground/90 h-12 px-6 shadow-xl font-semibold gap-2"
        >
          Show map <Map className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
