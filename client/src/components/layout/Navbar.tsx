import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Navbar() {

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex flex-col items-center pt-4 pb-6 gap-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 w-full relative">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">U</span>
            </div>
            <span className="font-heading text-2xl font-bold text-primary hidden lg:block">
              Uniboe
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/host">
            <Button variant="ghost" className="hidden md:flex rounded-full font-medium hover:bg-muted text-sm px-4">
              Manage listings
            </Button>
          </Link>
        </div>
      </div>

      {/* Search Bar - Desktop (Modified) */}
      <div className="hidden md:flex items-center w-full max-w-[800px] rounded-full border shadow-sm hover:shadow-md transition-all bg-background pl-8 pr-2 h-[66px] cursor-pointer mt-2 border-muted-foreground/20 relative group">
        
        <div className="flex-1 flex flex-col justify-center h-full border-r pr-4">
           <label className="text-xs font-extrabold px-1 text-foreground">Where</label>
           <input 
             type="text" 
             placeholder="Search housing near your university" 
             className="w-full text-sm text-muted-foreground outline-none bg-transparent px-1 placeholder:text-muted-foreground overflow-ellipsis"
           />
        </div>

        <div className="flex items-center gap-2 px-4">
           <Button variant="ghost" className="rounded-full h-9 text-xs font-semibold px-4 hover:bg-muted">
             University
           </Button>
           <div className="h-6 w-[1px] bg-border"></div>
           <Button variant="ghost" className="rounded-full h-9 text-xs font-semibold px-4 hover:bg-muted">
             City
           </Button>
        </div>
        
        <div className="bg-primary rounded-full p-4 text-primary-foreground ml-2 hover:bg-primary/90 transition-colors aspect-square flex items-center justify-center h-[48px] w-[48px]">
          <Search className="h-5 w-5 font-bold stroke-[3px]" />
        </div>
      </div>
    </nav>
  );
}
