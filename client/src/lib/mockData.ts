import studioImage from '@assets/generated_images/modern_bright_studio_apartment_interior.png';
import cozyImage from '@assets/generated_images/cozy_student_apartment_living_room.png';
import luxuryImage from '@assets/generated_images/luxury_student_dormitory_lounge.png';
import dormImage from '@assets/generated_images/dorm_room_desk_setup.png';
import libraryImage from '@assets/generated_images/students_studying_in_library.png';

export type Listing = {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  type: 'Studio' | 'Apartment' | 'Dorm' | 'House';
  rating: number;
  reviewsCount: number;
  images: string[];
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    responseRate: string;
    joined: string;
  };
  coordinates: { lat: number; lng: number };
};

export const listings: Listing[] = [
  {
    id: '1',
    title: 'Modern Studio near NYU',
    description: 'Bright and airy studio apartment just 5 minutes walk from NYU campus. Features a dedicated study area, high-speed internet, and modern kitchen appliances. Perfect for focused students.',
    price: 2800,
    location: 'Greenwich Village, NY',
    bedrooms: 0,
    bathrooms: 1,
    type: 'Studio',
    rating: 4.8,
    reviewsCount: 24,
    images: [studioImage, cozyImage, luxuryImage],
    amenities: ['Wifi', 'Kitchen', 'Air conditioning', 'Washer', 'Dryer', 'Elevator'],
    host: {
      name: 'Sarah Jenkins',
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      responseRate: '100%',
      joined: '2021',
    },
    coordinates: { lat: 40.7295, lng: -73.9965 },
  },
  {
    id: '2',
    title: 'Cozy 2BR Apartment - Columbia U',
    description: 'Charming 2-bedroom apartment in Morningside Heights. Spacious living room with bookshelves, hardwood floors, and plenty of natural light. Great for roommates.',
    price: 3600,
    location: 'Morningside Heights, NY',
    bedrooms: 2,
    bathrooms: 1,
    type: 'Apartment',
    rating: 4.6,
    reviewsCount: 18,
    images: [cozyImage, dormImage, studioImage],
    amenities: ['Wifi', 'Kitchen', 'Heating', 'Smoke alarm', 'Carbon monoxide alarm'],
    host: {
      name: 'David Chen',
      avatar: 'https://i.pravatar.cc/150?u=david',
      responseRate: '95%',
      joined: '2020',
    },
    coordinates: { lat: 40.8075, lng: -73.9626 },
  },
  {
    id: '3',
    title: 'Luxury Student Dorm Suite',
    description: 'Premium student living with resort-style amenities. Includes access to gym, study lounge, game room, and rooftop terrace. Fully furnished with weekly cleaning service.',
    price: 2200,
    location: 'Boston, MA',
    bedrooms: 1,
    bathrooms: 1,
    type: 'Dorm',
    rating: 4.9,
    reviewsCount: 42,
    images: [luxuryImage, studioImage, cozyImage],
    amenities: ['Wifi', 'Gym', 'Study Room', 'Game Room', 'Rooftop', 'Security'],
    host: {
      name: 'Beacon Student Living',
      avatar: 'https://i.pravatar.cc/150?u=beacon',
      responseRate: '98%',
      joined: '2019',
    },
    coordinates: { lat: 42.3505, lng: -71.1054 },
  },
  {
    id: '4',
    title: 'Historic Townhouse Share',
    description: 'Share a beautiful historic townhouse with other grad students. Large common areas, backyard garden, and quiet study environment. Close to Boston University.',
    price: 1500,
    location: 'Brookline, MA',
    bedrooms: 1,
    bathrooms: 2,
    type: 'House',
    rating: 4.7,
    reviewsCount: 12,
    images: [libraryImage, cozyImage, luxuryImage],
    amenities: ['Wifi', 'Kitchen', 'Garden', 'Washer', 'Dryer', 'Heating'],
    host: {
      name: 'James Wilson',
      avatar: 'https://i.pravatar.cc/150?u=james',
      responseRate: '90%',
      joined: '2018',
    },
    coordinates: { lat: 42.3467, lng: -71.1150 },
  },
  {
    id: '5',
    title: 'Downtown Loft - 3BR',
    description: 'Industrial style loft with high ceilings and exposed brick. Huge windows, open concept living/dining. Walking distance to multiple campuses.',
    price: 4500,
    location: 'SoHo, NY',
    bedrooms: 3,
    bathrooms: 2,
    type: 'Apartment',
    rating: 4.5,
    reviewsCount: 8,
    images: [cozyImage, studioImage, dormImage],
    amenities: ['Wifi', 'Kitchen', 'Elevator', 'Air conditioning', 'Dishwasher'],
    host: {
      name: 'Metro Properties',
      avatar: 'https://i.pravatar.cc/150?u=metro',
      responseRate: '92%',
      joined: '2022',
    },
    coordinates: { lat: 40.7233, lng: -74.0030 },
  },
];
