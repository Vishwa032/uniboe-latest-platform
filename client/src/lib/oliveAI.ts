import { listings, Listing } from "./mockData";
import { posts, Post } from "./communityData";

export type MessageType = 'text' | 'listings' | 'posts';

export interface OliveMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  type: MessageType;
  data?: Listing[] | Post[];
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  title: string;
  date: string; // "Today", "Yesterday", etc.
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function generateOliveResponse(query: string): Promise<OliveMessage> {
  await delay(1500); // Simulate thinking

  const lowerQuery = query.toLowerCase();

  // Search Listings
  if (lowerQuery.includes('listing') || lowerQuery.includes('apartment') || lowerQuery.includes('housing') || lowerQuery.includes('rent') || lowerQuery.includes('near') || lowerQuery.includes('br')) {
    // Simple keyword matching for demo
    let filteredListings = listings;
    
    if (lowerQuery.includes('nyu')) {
      filteredListings = listings.filter(l => l.description.toLowerCase().includes('nyu') || l.location.includes('NY'));
    } else if (lowerQuery.includes('columbia')) {
      filteredListings = listings.filter(l => l.description.toLowerCase().includes('columbia'));
    } else if (lowerQuery.includes('boston')) {
      filteredListings = listings.filter(l => l.location.includes('Boston') || l.location.includes('Brookline'));
    } else if (lowerQuery.includes('cheap') || lowerQuery.includes('budget')) {
      filteredListings = listings.filter(l => l.price < 2500);
    }

    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: `I found ${filteredListings.length} listings that match your criteria. Here are the best options:`,
      type: 'listings',
      data: filteredListings.slice(0, 3),
      timestamp: new Date(),
    };
  }

  // Search Community Posts
  if (lowerQuery.includes('post') || lowerQuery.includes('community') || lowerQuery.includes('student') || lowerQuery.includes('say') || lowerQuery.includes('recommend')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "Here's what students are talking about regarding that topic:",
      type: 'posts',
      data: posts.slice(0, 2),
      timestamp: new Date(),
    };
  }

  // General Advice
  if (lowerQuery.includes('viewing') || lowerQuery.includes('ask')) {
    return {
      id: Date.now().toString(),
      role: 'assistant',
      content: "When viewing a student apartment, make sure to ask:\n\n1. **Utilities**: Are water, electricity, and internet included?\n2. **Noise**: How quiet is the building during exam weeks?\n3. **Lease Terms**: Is subletting allowed if you go home for summer?\n4. **Security**: How is building access controlled?\n5. **Maintenance**: What's the process for reporting issues?",
      type: 'text',
      timestamp: new Date(),
    };
  }

  // Default Response
  return {
    id: Date.now().toString(),
    role: 'assistant',
    content: "I can help you find housing, search community posts, or answer questions about student living. Try asking 'Find apartments near NYU' or 'Show posts about roommates'.",
    type: 'text',
    timestamp: new Date(),
  };
}

export const mockHistory: ChatSession[] = [
  { id: '1', title: 'Apartments near NYU', date: 'Today' },
  { id: '2', title: 'Lease questions', date: 'Yesterday' },
  { id: '3', title: 'Roommate advice', date: 'Previous 7 Days' },
];
