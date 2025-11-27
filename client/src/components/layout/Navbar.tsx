import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Search, Menu, Home, Building2, Building, Users, MessageCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("homes");

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

        {/* Center Tabs (Desktop) */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2 top-1">
          <div 
            className={cn(
              "flex flex-col items-center gap-2 cursor-pointer group hover:text-foreground/80 transition-colors px-2",
              activeTab === "homes" ? "text-foreground font-semibold" : "text-muted-foreground opacity-70 hover:opacity-100"
            )}
            onClick={() => setActiveTab("homes")}
          >
            <Home className={cn("h-6 w-6", activeTab === "homes" ? "stroke-[2.5px]" : "stroke-2")} />
            <span className="text-xs">Homes</span>
            {activeTab === "homes" && <div className="h-0.5 w-[120%] bg-foreground animate-in fade-in zoom-in duration-300 mt-2" />}
          </div>

          <div 
            className={cn(
              "flex flex-col items-center gap-2 cursor-pointer group hover:text-foreground/80 transition-colors px-2",
              activeTab === "apartments" ? "text-foreground font-semibold" : "text-muted-foreground opacity-70 hover:opacity-100"
            )}
             onClick={() => setActiveTab("apartments")}
          >
            <Building className={cn("h-6 w-6", activeTab === "apartments" ? "stroke-[2.5px]" : "stroke-2")} />
            <span className="text-xs">Apartments</span>
            {activeTab === "apartments" && <div className="h-0.5 w-[120%] bg-foreground animate-in fade-in zoom-in duration-300 mt-2" />}
          </div>
          
          <div 
            className={cn(
              "flex flex-col items-center gap-2 cursor-pointer group hover:text-foreground/80 transition-colors px-2",
              activeTab === "sublets" ? "text-foreground font-semibold" : "text-muted-foreground opacity-70 hover:opacity-100"
            )}
             onClick={() => setActiveTab("sublets")}
          >
            <Building2 className={cn("h-6 w-6", activeTab === "sublets" ? "stroke-[2.5px]" : "stroke-2")} />
            <span className="text-xs">Sublets</span>
            {activeTab === "sublets" && <div className="h-0.5 w-[120%] bg-foreground animate-in fade-in zoom-in duration-300 mt-2" />}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link href="/community">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted h-10 w-10 hidden md:flex" title="Community">
               <Users className="h-5 w-5" />
            </Button>
          </Link>
          
          <Link href="/messages">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted h-10 w-10 hidden md:flex" title="Messages">
               <MessageCircle className="h-5 w-5" />
            </Button>
          </Link>

          <Link href="/host">
            <Button variant="ghost" className="hidden md:flex rounded-full font-medium hover:bg-muted text-sm px-4">
              Switch to subletting
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-muted h-10 w-10">
             <div className="h-4 w-4 flex items-center justify-center">
               <span className="sr-only">Language</span>
               🌐
             </div>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full px-2 py-1 h-[42px] gap-2 hover:shadow-md transition-shadow border-muted-foreground/20 ml-1">
                <Menu className="h-5 w-5 ml-1 text-foreground/80" />
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 rounded-xl p-2">
              <DropdownMenuItem className="font-medium rounded-lg cursor-pointer">
                Sign up
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                Log in
              </DropdownMenuItem>
              <DropdownMenuSeparator className="my-2" />
              <Link href="/host">
                <DropdownMenuItem className="rounded-lg cursor-pointer">
                  Host your home
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="rounded-lg cursor-pointer">
                Help Center
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
