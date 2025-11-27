import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listings } from "@/lib/mockData";
import { Plus, Home, MessageSquare, Calendar, Settings, Trash2, Edit } from "lucide-react";

export default function HostDashboard() {
  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-heading font-bold">Host Dashboard</h1>
          <Button className="gap-2 font-bold">
            <Plus className="h-4 w-4" /> Create New Listing
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+1 new listing</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Needs action</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on 42 reviews</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1 space-y-2">
             <Button variant="secondary" className="w-full justify-start gap-2 font-medium">
               <Home className="h-4 w-4" /> Listings
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
               <Calendar className="h-4 w-4" /> Bookings
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
               <MessageSquare className="h-4 w-4" /> Messages
             </Button>
             <Button variant="ghost" className="w-full justify-start gap-2 font-medium">
               <Settings className="h-4 w-4" /> Settings
             </Button>
          </div>

          {/* Listings List */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-xl font-bold mb-4">Your Listings</h2>
            
            {listings.slice(0, 3).map((listing) => (
              <Card key={listing.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="w-full sm:w-48 h-32 sm:h-auto relative">
                    <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover absolute inset-0" />
                  </div>
                  <div className="flex-1 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{listing.title}</h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">Active</span>
                      </div>
                      <p className="text-muted-foreground text-sm">{listing.location}</p>
                      <div className="mt-2 text-sm font-medium">
                        ${listing.price} / month
                      </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                       <Button variant="outline" size="sm" className="gap-1">
                         <Edit className="h-3 w-3" /> Edit
                       </Button>
                       <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20">
                         <Trash2 className="h-3 w-3" /> Delete
                       </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
