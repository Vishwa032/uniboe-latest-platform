import studyImage from '@assets/generated_images/modern_university_housing_exterior_with_students.png'; // Reusing existing
import eventImage from '@assets/generated_images/modern_bright_studio_apartment_interior.png'; // Reusing existing

export type User = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  isVerified?: boolean;
  online?: boolean;
};

export type Comment = {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
};

export type Post = {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  type: 'text' | 'image' | 'poll';
  pollOptions?: { text: string; votes: number }[];
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  isListingShare?: boolean;
  listingId?: string;
};

export type Conversation = {
  id: string;
  participant: User;
  messages: Message[];
  unreadCount: number;
  lastMessageTime: string;
};

export const currentUser: User = {
  id: 'me',
  name: 'Alex Student',
  handle: '@alex_studies',
  avatar: 'https://github.com/shadcn.png',
};

export const users: User[] = [
  { id: 'u1', name: 'Jessica Lee', handle: '@jess_lee', avatar: 'https://i.pravatar.cc/150?u=1', isVerified: true, online: true },
  { id: 'u2', name: 'Campus Events', handle: '@campus_events', avatar: 'https://i.pravatar.cc/150?u=2', isVerified: true, online: false },
  { id: 'u3', name: 'Mike Chen', handle: '@mike_c', avatar: 'https://i.pravatar.cc/150?u=3', online: true },
  { id: 'u4', name: 'Sarah Wilson', handle: '@swilson', avatar: 'https://i.pravatar.cc/150?u=4', online: false },
  { id: 'u5', name: 'Housing Office', handle: '@housing_official', avatar: 'https://i.pravatar.cc/150?u=5', isVerified: true, online: true },
];

export const posts: Post[] = [
  {
    id: 'p1',
    author: users[0],
    content: 'Anyone looking for a roommate for next semester? I found a great 2BR near the engineering building but need someone to sign with! 🏠 #roommate #housing',
    timestamp: '2h ago',
    likes: 24,
    comments: [
      { id: 'c1', author: users[2], content: 'DM sent!', timestamp: '1h ago', likes: 2 },
      { id: 'c2', author: users[3], content: 'What is the rent range?', timestamp: '45m ago', likes: 1 },
    ],
    shares: 5,
    type: 'text',
  },
  {
    id: 'p2',
    author: users[1],
    content: 'Don\'t miss the Spring Mixer on the quad today! Free food and music until 4pm. 🍕🎵',
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop',
    timestamp: '4h ago',
    likes: 156,
    comments: [],
    shares: 42,
    type: 'image',
  },
  {
    id: 'p3',
    author: users[4],
    content: 'Reminder: Housing applications for Fall 2025 are due this Friday! Don\'t forget to submit your preferences.',
    timestamp: '5h ago',
    likes: 89,
    comments: [],
    shares: 120,
    type: 'text',
  },
  {
    id: 'p4',
    author: users[2],
    content: 'Best study spot on campus?',
    timestamp: '6h ago',
    likes: 45,
    comments: [],
    shares: 3,
    type: 'poll',
    pollOptions: [
      { text: 'Main Library 4th Floor', votes: 142 },
      { text: 'Student Union', votes: 56 },
      { text: 'Coffee Shop', votes: 89 },
      { text: 'Dorm Common Room', votes: 23 },
    ],
  },
  {
    id: 'p5',
    author: users[3],
    content: 'Just moved into my new studio! Loving the view.',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
    timestamp: '1d ago',
    likes: 234,
    comments: [],
    shares: 12,
    type: 'image',
  },
];

export const conversations: Conversation[] = [
  {
    id: 'conv1',
    participant: users[0],
    unreadCount: 2,
    lastMessageTime: '10:42 AM',
    messages: [
      { id: 'm1', senderId: 'me', text: 'Hi Jessica, I saw your post about the apartment.', timestamp: '10:30 AM', status: 'read' },
      { id: 'm2', senderId: 'u1', text: 'Hey! Yes, it\'s still available.', timestamp: '10:35 AM', status: 'read' },
      { id: 'm3', senderId: 'u1', text: 'Would you like to see some photos?', timestamp: '10:42 AM', status: 'delivered' },
    ],
  },
  {
    id: 'conv2',
    participant: users[2],
    unreadCount: 0,
    lastMessageTime: 'Yesterday',
    messages: [
      { id: 'm4', senderId: 'u2', text: 'Are you going to the game tonight?', timestamp: 'Yesterday', status: 'read' },
      { id: 'm5', senderId: 'me', text: 'Yeah, meet at 7?', timestamp: 'Yesterday', status: 'read' },
    ],
  },
  {
    id: 'conv3',
    participant: users[4],
    unreadCount: 0,
    lastMessageTime: 'Tue',
    messages: [
      { id: 'm6', senderId: 'u4', text: 'Your application has been received.', timestamp: 'Tue', status: 'read' },
    ],
  },
];
