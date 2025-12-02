import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ListingFilters() {
  const [priceModalOpen, setPriceModalOpen] = useState(false);
  const [bedsModalOpen, setBedsModalOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'min' | 'max'>('min');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBeds, setSelectedBeds] = useState<string[]>([]);
  const [selectedBaths, setSelectedBaths] = useState<string[]>([]);

  const priceOptions = ['No Min', '$2,000', '$2,500', '$3,000', '$3,500', '$4,500', '$8,500'];
  const bedOptions = ['Any', 'Studio+', '1+', '2+', '3+', '4+'];
  const bathOptions = ['Any', '1+', '2+', '3+'];

  const handlePriceSelect = (price: string) => {
    if (activeInput === 'min') {
      setMinPrice(price);
    } else {
      setMaxPrice(price);
    }
  };

  const handleBedSelect = (bed: string) => {
    if (selectedBeds.includes(bed)) {
      setSelectedBeds(selectedBeds.filter(b => b !== bed));
    } else if (selectedBeds.length < 2) {
      setSelectedBeds([...selectedBeds, bed]);
    } else {
      setSelectedBeds([selectedBeds[1], bed]);
    }
  };

  const handleBathSelect = (bath: string) => {
    if (selectedBaths.includes(bath)) {
      setSelectedBaths(selectedBaths.filter(b => b !== bath));
    } else if (selectedBaths.length < 2) {
      setSelectedBaths([...selectedBaths, bath]);
    } else {
      setSelectedBaths([selectedBaths[1], bath]);
    }
  };

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide">
      {/* Filters Button */}
      <Button variant="outline" className="h-11 px-4 gap-2 border-border rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
        <SlidersHorizontal className="h-4 w-4" />
        <span className="font-medium">Filters</span>
      </Button>

      {/* Price Modal */}
      <Dialog open={priceModalOpen} onOpenChange={setPriceModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-11 px-4 border-border rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
            Price
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Price Range</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Min Price</label>
                <Input
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  onFocus={() => setActiveInput('min')}
                  placeholder="No Min"
                  className={cn(
                    "h-11 rounded-lg",
                    activeInput === 'min' && "border-primary ring-1 ring-primary"
                  )}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Max Price</label>
                <Input
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  onFocus={() => setActiveInput('max')}
                  placeholder="No Max"
                  className={cn(
                    "h-11 rounded-lg",
                    activeInput === 'max' && "border-primary ring-1 ring-primary"
                  )}
                />
              </div>
            </div>
            <div className="space-y-2">
              {priceOptions.map((price) => (
                <div
                  key={price}
                  onClick={() => handlePriceSelect(price)}
                  className={cn(
                    "p-3 rounded-lg cursor-pointer transition-colors",
                    (activeInput === 'min' && minPrice === price) || (activeInput === 'max' && maxPrice === price)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  {price}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setMinPrice('');
                setMaxPrice('');
              }}
            >
              Clear
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setPriceModalOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Beds/Baths Modal */}
      <Dialog open={bedsModalOpen} onOpenChange={setBedsModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="h-11 px-4 border-border rounded-lg hover:bg-muted transition-colors whitespace-nowrap">
            Beds & Baths
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Beds & Baths</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Beds */}
            <div>
              <h3 className="font-semibold mb-3">Beds</h3>
              <div className="grid grid-cols-3 gap-2">
                {bedOptions.map((bed) => (
                  <Button
                    key={bed}
                    variant="outline"
                    onClick={() => handleBedSelect(bed)}
                    className={cn(
                      "h-12 rounded-lg",
                      selectedBeds.includes(bed)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {bed}
                  </Button>
                ))}
              </div>
            </div>

            {/* Baths */}
            <div>
              <h3 className="font-semibold mb-3">Baths</h3>
              <div className="grid grid-cols-3 gap-2">
                {bathOptions.map((bath) => (
                  <Button
                    key={bath}
                    variant="outline"
                    onClick={() => handleBathSelect(bath)}
                    className={cn(
                      "h-12 rounded-lg",
                      selectedBaths.includes(bath)
                        ? "bg-primary text-primary-foreground hover:bg-primary/90 border-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    {bath}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedBeds([]);
                setSelectedBaths([]);
              }}
            >
              Clear
            </Button>
            <Button
              className="bg-primary hover:bg-primary/90"
              onClick={() => setBedsModalOpen(false)}
            >
              Done
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* All Cities Dropdown */}
      <Select>
        <SelectTrigger className="h-11 w-40 border-border rounded-lg">
          <SelectValue placeholder="All Cities" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Cities</SelectItem>
          <SelectItem value="boston">Boston</SelectItem>
          <SelectItem value="cambridge">Cambridge</SelectItem>
          <SelectItem value="new-york">New York</SelectItem>
          <SelectItem value="philadelphia">Philadelphia</SelectItem>
          <SelectItem value="washington">Washington DC</SelectItem>
          <SelectItem value="chicago">Chicago</SelectItem>
        </SelectContent>
      </Select>

      {/* All Types Dropdown */}
      <Select>
        <SelectTrigger className="h-11 w-40 border-border rounded-lg">
          <SelectValue placeholder="All Types" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="apartment">Apartments</SelectItem>
          <SelectItem value="house">Houses</SelectItem>
          <SelectItem value="sublet">Sublets</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
