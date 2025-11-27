import Sidebar from "@/components/layout/Sidebar";
import ChatSidebar from "@/components/olive/ChatSidebar";
import ChatInterface from "@/components/olive/ChatInterface";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function Olive() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="h-screen bg-background pl-[4.5rem] overflow-hidden flex">
      <Sidebar />
      
      {/* Toggle Sidebar Button */}
      <div className="absolute top-4 left-20 z-50">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-muted-foreground hover:text-foreground"
        >
          {sidebarOpen ? <PanelLeftClose className="h-5 w-5" /> : <PanelLeftOpen className="h-5 w-5" />}
        </Button>
      </div>

      <ChatSidebar isOpen={sidebarOpen} onNewChat={() => window.location.reload()} />
      <ChatInterface sidebarOpen={sidebarOpen} />
    </div>
  );
}
