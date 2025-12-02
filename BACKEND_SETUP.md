# Uniboe Backend Setup Guide

This guide explains how to connect and run the Uniboe FastAPI backend with the React frontend.

## Prerequisites

- Python 3.8+ installed
- pip (Python package manager)
- Virtual environment (recommended)

## Backend Structure

The backend is a **FastAPI** application located in the `/backend` folder with the following structure:

```
backend/
├── api/
│   ├── main.py           # FastAPI application entry point
│   └── routes/           # API route handlers
│       ├── auth.py       # Authentication endpoints
│       ├── housing.py    # Housing listings endpoints
│       ├── feed.py       # Community feed endpoints
│       ├── chat.py       # Messaging endpoints
│       ├── profile.py    # User profile endpoints
│       ├── olive.py      # SAGE AI assistant endpoints
│       └── universities.py # University data endpoints
├── core/
│   ├── models/          # Pydantic models
│   └── services/        # Business logic
├── config/
│   └── settings.py      # Environment configuration
├── .env                 # Environment variables (DO NOT COMMIT)
└── requirements.txt     # Python dependencies
```

## Setup Instructions

### 1. Install Backend Dependencies

```bash
# Option 1: Using npm script (recommended)
npm run backend:install

# Option 2: Manual installation
cd backend
pip install -r requirements.txt
```

### 2. Configure Environment Variables

The backend requires a `.env` file in the `/backend` directory. Make sure it contains:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_ANON_KEY=your_anon_key

# AI Configuration
GROQ_API_KEY=your_groq_api_key

# Application Configuration
ENVIRONMENT=dev
DEBUG=true
SECRET_KEY=your_secret_key_at_least_32_characters_long

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:5000,http://localhost:5173
```

**Note:** The backend already has a `.env` file from your old version. Verify it has all required keys.

### 3. Frontend Configuration

The frontend is already configured to connect to the backend:

- API client: `/client/src/lib/api.ts`
- Environment: `/client/.env`

Frontend `.env`:
```env
VITE_API_URL=http://localhost:8000
```

## Running the Application

### Option 1: Run Everything Together (Recommended)

```bash
npm run dev:all
```

This will start:
- Frontend (React + Vite) on http://localhost:5000
- Backend (FastAPI) on http://localhost:8000

### Option 2: Run Separately

**Terminal 1 - Frontend:**
```bash
npm run dev:client
```

**Terminal 2 - Backend:**
```bash
npm run dev:backend
```

### Option 3: Run Backend Only

```bash
cd backend
python -m uvicorn backend.api.main:app --reload --host 0.0.0.0 --port 8000
```

## API Documentation

Once the backend is running, you can access:

- **Swagger UI (Interactive API docs):** http://localhost:8000/docs
- **ReDoc (Alternative docs):** http://localhost:8000/redoc
- **Health Check:** http://localhost:8000/health

## API Endpoints Overview

### Authentication (`/api/auth`)
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify-email` - Verify email address

### Housing (`/api/housing`)
- `GET /api/housing` - List all housing
- `GET /api/housing/{id}` - Get listing details
- `POST /api/housing` - Create new listing
- `PUT /api/housing/{id}` - Update listing
- `DELETE /api/housing/{id}` - Delete listing
- `GET /api/housing/my-listings` - Get user's listings

### Community Feed (`/api/feed`)
- `GET /api/feed` - Get feed posts
- `POST /api/feed` - Create new post
- `POST /api/feed/{id}/like` - Like a post
- `POST /api/feed/{id}/comment` - Comment on post

### Chat (`/api/chat`)
- `GET /api/chat/conversations` - List conversations
- `GET /api/chat/{id}/messages` - Get messages
- `POST /api/chat/{id}/messages` - Send message

### Profile (`/api/profile`)
- `GET /api/profile/me` - Get own profile
- `GET /api/profile/{userId}` - Get user profile
- `PUT /api/profile/me` - Update profile

### SAGE AI (`/api/olive`)
- `POST /api/olive/chat` - Chat with AI assistant
- `GET /api/olive/history` - Get chat history

### Universities (`/api/universities`)
- `GET /api/universities` - List universities
- `GET /api/universities/search?q=query` - Search universities

## Using the API Client in Frontend

The frontend has a typed API client at `/client/src/lib/api.ts`:

```typescript
import { api, endpoints } from '@/lib/api';

// Example: Get housing listings
const listings = await api.get(endpoints.housing.list);

// Example: Create a post
const post = await api.post(endpoints.feed.create, {
  title: "Looking for roommate",
  content: "Need someone for spring semester..."
});

// Example: Login
const user = await api.post(endpoints.auth.login, {
  email: "student@university.edu",
  password: "password123"
});
```

## CORS Configuration

The backend is configured to accept requests from:
- http://localhost:5000 (Vite dev server)
- http://localhost:5173 (Alternative Vite port)

Additional origins can be added in `/backend/.env`:
```env
ALLOWED_ORIGINS=http://localhost:5000,http://localhost:5173,https://yourdomain.com
```

## Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed: `python --version`
- Check that all dependencies are installed: `pip list`
- Verify `.env` file exists in `/backend` directory

### Frontend can't connect to backend
- Check backend is running on port 8000
- Verify `VITE_API_URL` in `/client/.env`
- Check browser console for CORS errors

### Database/Supabase errors
- Verify Supabase credentials in `/backend/.env`
- Check Supabase project is active and accessible

### CORS errors
- Ensure frontend URL is in `ALLOWED_ORIGINS` in backend `.env`
- Check that `credentials: "include"` is set in API requests

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reload
2. **API Testing**: Use http://localhost:8000/docs for interactive API testing
3. **Logs**: Backend logs appear in the terminal running the backend
4. **Type Safety**: The frontend API client is fully typed for better DX

## Production Deployment

For production:
1. Set `ENVIRONMENT=prod` in backend `.env`
2. Set `DEBUG=false`
3. Update `ALLOWED_ORIGINS` with production URLs
4. Use a production ASGI server (Gunicorn + Uvicorn workers)
5. Set strong `SECRET_KEY` (at least 32 characters)

## Notes

- The backend code has **NOT** been modified - only connection setup was added
- All existing backend routes and services remain unchanged
- Frontend now has a typed API client for easy integration
