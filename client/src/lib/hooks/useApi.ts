/**
 * Custom hooks for API integration with React Query
 * Example usage of the API client with the Uniboe backend
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, endpoints } from '@/lib/api';

/**
 * Hook to fetch housing listings
 */
export function useHousingListings() {
  return useQuery({
    queryKey: ['housing', 'list'],
    queryFn: () => api.get(endpoints.housing.list),
  });
}

/**
 * Hook to fetch a single housing listing
 */
export function useHousingDetails(id: string) {
  return useQuery({
    queryKey: ['housing', id],
    queryFn: () => api.get(endpoints.housing.details(id)),
    enabled: !!id,
  });
}

/**
 * Hook to fetch community feed posts
 */
export function useFeed() {
  return useQuery({
    queryKey: ['feed'],
    queryFn: () => api.get(endpoints.feed.list),
  });
}

/**
 * Hook to create a new feed post
 */
export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      api.post(endpoints.feed.create, data),
    onSuccess: () => {
      // Invalidate and refetch feed
      queryClient.invalidateQueries({ queryKey: ['feed'] });
    },
  });
}

/**
 * Hook to fetch current user profile
 */
export function useProfile() {
  return useQuery({
    queryKey: ['profile', 'me'],
    queryFn: () => api.get(endpoints.profile.me),
  });
}

/**
 * Hook for user login
 */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (credentials: { email: string; password: string }) =>
      api.post(endpoints.auth.login, credentials),
    onSuccess: () => {
      // Refetch user profile after login
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}

/**
 * Hook for user signup
 */
export function useSignup() {
  return useMutation({
    mutationFn: (data: {
      email: string;
      password: string;
      full_name: string;
      university_email?: string;
    }) => api.post(endpoints.auth.signup, data),
  });
}

/**
 * Hook to fetch chat conversations
 */
export function useConversations() {
  return useQuery({
    queryKey: ['chat', 'conversations'],
    queryFn: () => api.get(endpoints.chat.conversations),
  });
}

/**
 * Hook to fetch messages in a conversation
 */
export function useMessages(conversationId: string) {
  return useQuery({
    queryKey: ['chat', conversationId, 'messages'],
    queryFn: () => api.get(endpoints.chat.messages(conversationId)),
    enabled: !!conversationId,
  });
}

/**
 * Hook to send a message
 */
export function useSendMessage(conversationId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: { content: string }) =>
      api.post(endpoints.chat.send(conversationId), message),
    onSuccess: () => {
      // Refetch messages after sending
      queryClient.invalidateQueries({
        queryKey: ['chat', conversationId, 'messages'],
      });
    },
  });
}

/**
 * Hook to chat with SAGE AI assistant
 */
export function useSageChat() {
  return useMutation({
    mutationFn: (message: { message: string; conversation_id?: string }) =>
      api.post(endpoints.olive.chat, message),
  });
}

/**
 * Hook to check backend health
 */
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => api.get(endpoints.health),
    // Check health every 30 seconds
    refetchInterval: 30000,
  });
}
