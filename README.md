# Uniboe - University Student Housing Platform

A comprehensive platform connecting university students with housing opportunities, featuring AI-powered assistance, community features, and secure messaging.

## Features

### 🏠 Housing Marketplace
- Browse and search verified student housing listings
- Advanced filters (price, bedrooms, distance from campus)
- Detailed listing pages with photos and amenities
- Host dashboard for managing property listings

### 🤖 SAGE AI Assistant
- AI-powered housing recommendations
- Natural language search for properties and community posts
- Smart responses to housing-related questions

### 👥 Community Feed
- Share posts with other students
- Like and comment on posts
- Image sharing support
- Real-time engagement tracking

### 💬 Secure Messaging
- End-to-end encrypted conversations
- Real-time message delivery
- Read receipts and message status
- Direct communication with hosts

### 👤 User Profiles
- Verified university email authentication
- Customizable profiles with interests
- View personal posts and listings
- Track connections and activity

## Tech Stack

### Frontend
- **React** with TypeScript
- **Wouter** for routing
- **TanStack Query** for data fetching and caching
- **Tailwind CSS** + **shadcn/ui** for styling
- **Vite** for build tooling

### Backend
- **FastAPI** (Python) for REST API
- **Supabase** for authentication and database
- **PostgreSQL** for data storage
- **JWT** for secure authentication
- **bcrypt** for password hashing

## Project Structure

```
Uniboe-upgrade/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── lib/          # Utilities and API client
│   │   └── hooks/        # Custom React hooks
│   └── public/           # Static assets
│
├── backend/               # FastAPI backend
│   ├── api/              # API routes
│   ├── core/             # Business logic
│   │   ├── models/       # Pydantic models
│   │   └── services/     # Service layer
│   ├── db/               # Database configuration
│   └── config/           # App configuration
│
└── server/               # Legacy server files
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- Supabase account (for database and auth)

### Environment Variables

Create `.env` files in the following locations:

**Backend** (`backend/.env`):
```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SUPABASE_JWT_SECRET=your_jwt_secret
SECRET_KEY=your_secret_key
ENCRYPTION_KEY=your_encryption_key
```

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:8000
```

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/uniboe.git
cd uniboe
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Running the Application

**Development mode** (runs both frontend and backend):
```bash
npm run dev
```

This starts:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:8000`

**Run separately:**

Frontend only:
```bash
npm run dev:client
```

Backend only:
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
python main.py
```

## API Documentation

Once the backend is running, view interactive API docs at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Key Features Implementation

### Authentication
- JWT-based authentication with Supabase
- University email verification
- Protected routes on frontend
- Token expiration handling with automatic redirect

### Real-time Features
- React Query for automatic data refetching
- Optimistic UI updates for likes and messages
- Query invalidation for instant UI synchronization

### Security
- Password hashing with bcrypt
- JWT token validation
- End-to-end message encryption
- University domain verification
- Protected API endpoints

### Data Flow
1. User actions trigger React Query mutations
2. Mutations call FastAPI endpoints
3. Backend validates and processes data
4. Supabase stores/retrieves data
5. Response updates React Query cache
6. UI automatically re-renders with new data

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions, please open an issue on GitHub.
