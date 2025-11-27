import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, MessageCircle, Menu, Settings, LogOut, PlusSquare, Sparkles } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Sparkles, label: "Olive AI", href: "/olive" },
    { icon: Users, label: "Community", href: "/community" },
    { icon: MessageCircle, label: "Messages", href: "/messages" },
    { icon: PlusSquare, label: "Sublet", href: "/host" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen z-50 flex flex-col bg-background/80 backdrop-blur-xl border-r shadow-2xl transition-all duration-300 ease-in-out w-[4.5rem] hover:w-64 group overflow-hidden">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-4 shrink-0">
        <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
          <span className="text-primary-foreground font-bold text-2xl">U</span>
        </div>
        <span className="font-heading text-2xl font-bold text-primary ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Uniboe
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 flex flex-col gap-2 px-3 py-6">
        {navItems.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <div 
                className={cn(
                  "flex items-center h-12 px-3 rounded-xl cursor-pointer transition-all duration-200 group/item",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "h-6 w-6 shrink-0 transition-transform duration-300 group-hover/item:scale-110",
                  isActive && "stroke-[2.5px]"
                )} />
                <span className={cn(
                  "ml-4 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap",
                  isActive && "font-bold"
                )}>
                  {item.label}
                </span>
                
                {item.label === "Messages" && (
                  <div className="ml-auto w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-3 space-y-2 border-t bg-background/50">
        <Button variant="ghost" className="w-full justify-start px-3 h-12 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted group/settings">
          <Settings className="h-6 w-6 shrink-0 group-hover/settings:rotate-90 transition-transform duration-500" />
          <span className="ml-4 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Settings
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
             <div className="flex items-center h-12 px-2 rounded-xl cursor-pointer hover:bg-muted transition-colors mt-auto">
              <Avatar className="h-9 w-9 border-2 border-background shadow-sm shrink-0">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="ml-3 flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                <span className="text-sm font-bold truncate">Alex Student</span>
                <span className="text-xs text-muted-foreground truncate">@alex_studies</span>
              </div>
              <Menu className="ml-auto h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side="right" className="w-56 ml-4">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>My Listings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
