import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { api, endpoints, getAuthToken } from "@/lib/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * Protected route component that checks authentication
 * Redirects to /auth if user is not authenticated
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [, setLocation] = useLocation();
  const token = getAuthToken();

  // Try to fetch current user to verify token is valid
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: () => api.get(endpoints.auth.me),
    retry: false,
    enabled: !!token, // Only run query if token exists
  });

  useEffect(() => {
    // If no token, redirect immediately
    if (!token) {
      setLocation('/auth');
      return;
    }

    // If query finished and there's an error (invalid/expired token), redirect
    if (!isLoading && error) {
      setLocation('/auth');
    }
  }, [token, isLoading, error, setLocation]);

  // Show loading state while checking authentication
  if (!token || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  // If there's an error, don't render children (will redirect)
  if (error) {
    return null;
  }

  // User is authenticated, render the protected content
  return <>{children}</>;
}
