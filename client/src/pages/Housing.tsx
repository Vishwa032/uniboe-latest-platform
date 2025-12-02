import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";
import ListingCard from "@/components/listing/ListingCard";
import ListingFilters from "@/components/listing/ListingFilters";
import { listings } from "@/lib/mockData";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from '@assets/generated_images/students_studying_in_library.png';
import { useQuery } from "@tanstack/react-query";
import { api, endpoints } from "@/lib/api";

export default function Housing() {
  // Fetch housing listings from backend
  const { data: backendListings, isLoading, error } = useQuery({
    queryKey: ['housing', 'list'],
    queryFn: () => api.get(endpoints.housing.list),
    retry: false,
  });

  // Debug logging
  if (error) {
    console.log('Housing page error:', error);
  }
  if (backendListings) {
    console.log('Housing listings from backend:', backendListings);
  }

  // Use backend data if available, otherwise fall back to mock data
  // Backend might return data in {listings: [...]} or {data: [...]} format
  let displayListings = listings; // default to mock
  if (backendListings) {
    if (Array.isArray(backendListings)) {
      displayListings = backendListings;
    } else if (backendListings.listings && Array.isArray(backendListings.listings)) {
      displayListings = backendListings.listings;
    } else if (backendListings.data && Array.isArray(backendListings.data)) {
      displayListings = backendListings.data;
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20 pl-[4.5rem]">
      <Sidebar />
      <Navbar />

      {/* Hero Section with soft gradient overlay */}
      <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden hidden md:block">
        {/* Soft Sunset Clay to Soft Lilac gradient overlay (8% opacity) */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.08] to-secondary/[0.08] z-[5]" />

        <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center text-center px-4">
          <div className="max-w-2xl text-white space-y-4">
            <h1 className="text-4xl md:text-6xl font-heading font-bold drop-shadow-lg relative">
              Find your home away from home
              {/* Soft Lilac underline */}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-48 h-1 bg-secondary/60 rounded-full" />
            </h1>
            <p className="text-lg md:text-xl font-medium drop-shadow-md pt-2">
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

        {isLoading ? (
          <div className="mt-8 text-center">
            <div className="text-lg text-muted-foreground">Loading housing listings...</div>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayListings.map((listing: any) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </main>

      {/* Floating Map Toggle */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <Button
          className="rounded-full bg-foreground text-white hover:bg-primary h-12 px-6 font-semibold gap-2 shadow-[0_4px_20px_rgba(107,78,67,0.15)] hover:shadow-[0_6px_24px_rgba(217,136,106,0.25)] transition-all"
        >
          Show map <Map className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
