import { Button } from "@/components/ui/button";
import { Search, Home, Building2, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function TopSearch() {
  const [activeTab, setActiveTab] = useState("homes");

  return (
    <div className="w-full flex flex-col items-center pt-6 pb-6 gap-4">
      {/* Center Tabs (Desktop) */}
      <div className="hidden md:flex items-center gap-8">
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
    </div>
  );
}
