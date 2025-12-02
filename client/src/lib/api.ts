/**
 * API client configuration for Uniboe backend
 * Connects to FastAPI backend at the configured API_URL
 */

// Get API URL from environment variable or use default
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Token management
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

export function clearAuthToken(): void {
  localStorage.removeItem('auth_token');
}

/**
 * Base API request function with automatic error handling
 */
async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;

    // Handle 401 Unauthorized - token expired or invalid
    if (res.status === 401) {
      // Clear the invalid token
      clearAuthToken();

      // Redirect to auth page if not already there
      if (typeof window !== 'undefined' && window.location.pathname !== '/auth') {
        window.location.href = '/auth?session_expired=true';
      }
    }

    throw new Error(`${res.status}: ${text}`);
  }
}

/**
 * Make an API request to the backend
 * @param method HTTP method
 * @param endpoint API endpoint (will be prefixed with /api)
 * @param data Request body data
 * @param options Additional fetch options
 */
export async function apiRequest<T = any>(
  method: string,
  endpoint: string,
  data?: unknown,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const token = getAuthToken();

  // Debug logging
  console.log(`API Request: ${method} ${url}`);
  console.log(`Token: ${token ? token.substring(0, 20) + '...' : 'none'}`);

  const res = await fetch(url, {
    method,
    headers: {
      ...(data ? { "Content-Type": "application/json" } : {}),
      ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      ...options.headers,
    },
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
    ...options,
  });

  console.log(`Response: ${res.status} ${res.statusText}`);

  await throwIfResNotOk(res);
  return await res.json();
}

/**
 * API client with typed methods for each HTTP verb
 */
export const api = {
  get: <T = any>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>('GET', endpoint, undefined, options),

  post: <T = any>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>('POST', endpoint, data, options),

  put: <T = any>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>('PUT', endpoint, data, options),

  patch: <T = any>(endpoint: string, data?: unknown, options?: RequestInit) =>
    apiRequest<T>('PATCH', endpoint, data, options),

  delete: <T = any>(endpoint: string, options?: RequestInit) =>
    apiRequest<T>('DELETE', endpoint, undefined, options),
};

/**
 * API endpoints organized by feature
 */
export const endpoints = {
  // Root
  root: '/',
  health: '/health',

  // Authentication
  auth: {
    signup: '/api/auth/register',
    login: '/api/auth/login',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    verifyEmail: '/api/auth/verify-email',
  },

  // Universities
  universities: {
    list: '/api/universities',
    search: (query: string) => `/api/universities/search?q=${encodeURIComponent(query)}`,
  },

  // Housing
  housing: {
    list: '/api/housing',
    details: (id: string) => `/api/housing/${id}`,
    create: '/api/housing',
    update: (id: string) => `/api/housing/${id}`,
    delete: (id: string) => `/api/housing/${id}`,
    search: '/api/housing/search',
    myListings: '/api/housing/my-listings',
  },

  // Feed/Community
  feed: {
    list: '/api/feed',
    create: '/api/feed',
    details: (id: string) => `/api/feed/${id}`,
    like: (id: string) => `/api/feed/${id}/like`,
    comment: (id: string) => `/api/feed/${id}/comment`,
    userPosts: (userId: string) => `/api/feed/users/${userId}/posts`,
  },

  // Chat/Messages
  chat: {
    conversations: '/api/chat/conversations',
    messages: (conversationId: string) => `/api/chat/conversations/${conversationId}/messages`,
    send: (conversationId: string) => `/api/chat/conversations/${conversationId}/messages`,
  },

  // Profile
  profile: {
    me: '/api/profile/me',
    get: (userId: string) => `/api/profile/${userId}`,
    update: '/api/profile/me',
    stats: '/api/profile/me/stats',
  },

  // Olive AI (SAGE)
  olive: {
    chat: '/api/olive/chat',
    history: '/api/olive/history',
  },
};

export default api;
