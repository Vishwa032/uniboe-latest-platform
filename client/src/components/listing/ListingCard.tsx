import { Link } from "wouter";
import { Listing } from "@/lib/mockData";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  return (
    <Link href={`/listing/${listing.id}`}>
      <div className="group cursor-pointer space-y-3">
        <div className="relative overflow-hidden rounded-xl bg-muted">
          <Carousel className="w-full">
            <CarouselContent>
              {listing.images.map((img, index) => (
                <CarouselItem key={index}>
                  <AspectRatio ratio={1}>
                    <img
                      src={img}
                      alt={listing.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </AspectRatio>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CarouselNext className="right-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Carousel>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-8 w-8 rounded-full bg-black/10 text-white backdrop-blur-sm hover:bg-white hover:text-primary hover:scale-110 transition-all"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <Heart className="h-5 w-5" />
          </Button>
          
          <div className="absolute top-3 left-3 rounded-md bg-white/90 px-2 py-1 text-xs font-bold uppercase backdrop-blur-sm">
            {listing.type}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg leading-tight truncate pr-4">
              {listing.location}
            </h3>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span>{listing.rating}</span>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm truncate">
            {listing.title}
          </p>
          
          <p className="text-muted-foreground text-sm">
            {listing.bedrooms === 0 ? 'Studio' : `${listing.bedrooms} bedrooms`}
          </p>
          
          <div className="flex items-baseline gap-1 mt-1">
            <span className="font-semibold text-lg">${listing.price}</span>
            <span className="text-muted-foreground">/ month</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
