import Sidebar from "@/components/layout/Sidebar";
import ChatList from "@/components/messages/ChatList";
import ChatWindow from "@/components/messages/ChatWindow";
import { conversations } from "@/lib/communityData";
import { useState } from "react";

export default function Messages() {
  const [selectedConvId, setSelectedConvId] = useState(conversations[0].id);
  const selectedConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden pl-[4.5rem]">
      <Sidebar />
      
      <main className="flex-1 flex overflow-hidden max-w-[1600px] mx-auto w-full border-x shadow-2xl my-4 rounded-2xl border-y bg-background/95 backdrop-blur-xl">
        <ChatList 
          conversations={conversations} 
          selectedId={selectedConvId} 
          onSelect={setSelectedConvId} 
        />
        
        <div className="flex-1 bg-muted/10">
          <ChatWindow conversation={selectedConv} />
        </div>
      </main>
    </div>
  );
}
