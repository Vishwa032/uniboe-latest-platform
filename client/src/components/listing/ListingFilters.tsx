import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SlidersHorizontal } from "lucide-react";

export default function ListingFilters() {
  return (
    <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="rounded-full gap-2 h-12 px-4 border-muted-foreground/20">
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:w-[400px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>
              Find the perfect place near your university.
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-6 space-y-8">
            {/* Price Range */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Price range</h3>
              <Slider defaultValue={[2000]} max={6000} min={500} step={100} />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>$500</span>
                <span>$6,000+</span>
              </div>
            </div>

            {/* Rooms */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Rooms and beds</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Bedrooms</Label>
                  <div className="flex gap-2">
                    {['Any', '1', '2', '3+'].map((opt) => (
                      <Button 
                        key={opt} 
                        variant={opt === 'Any' ? 'default' : 'outline'} 
                        size="sm"
                        className="rounded-full"
                      >
                        {opt}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Amenities</h3>
              <div className="grid grid-cols-2 gap-4">
                {['Wifi', 'Kitchen', 'Washer', 'Dryer', 'Air conditioning', 'Heating'].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox id={amenity} />
                    <Label htmlFor={amenity}>{amenity}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-4 border-t bg-background sticky bottom-0">
            <Button variant="ghost" className="flex-1">Clear all</Button>
            <Button className="flex-1">Show 125 homes</Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quick Filters */}
      {['Price', 'Type of place', 'Bedrooms', 'Wifi', 'Kitchen', 'Washer', 'Air Conditioning'].map((filter) => (
        <Button
          key={filter}
          variant="outline"
          className="rounded-full h-12 px-4 border-muted-foreground/20 whitespace-nowrap"
        >
          {filter}
        </Button>
      ))}
    </div>
  );
}
