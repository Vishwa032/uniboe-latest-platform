import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">U</span>
            </div>
            <span className="font-heading text-2xl font-bold text-primary hidden sm:block">
              UniStay
            </span>
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex items-center rounded-full border shadow-sm hover:shadow-md transition-shadow px-4 py-2.5 gap-4 cursor-pointer">
          <span className="text-sm font-medium pl-2">Anywhere</span>
          <span className="h-4 w-[1px] bg-border"></span>
          <span className="text-sm font-medium">Any week</span>
          <span className="h-4 w-[1px] bg-border"></span>
          <span className="text-sm text-muted-foreground">Add guests</span>
          <div className="bg-primary rounded-full p-2 text-primary-foreground ml-2">
            <Search className="h-4 w-4" />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <Link href="/host">
            <Button variant="ghost" className="hidden md:flex rounded-full font-medium">
              Switch to hosting
            </Button>
          </Link>
          
          <Button variant="ghost" size="icon" className="rounded-full">
             <div className="h-5 w-5 flex items-center justify-center">
               <span className="sr-only">Language</span>
               🌐
             </div>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full px-2 py-1 h-auto gap-2 hover:shadow-md transition-shadow border-muted-foreground/20">
                <Menu className="h-5 w-5 ml-1" />
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
    </nav>
  );
}
