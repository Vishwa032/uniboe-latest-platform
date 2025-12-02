import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a timestamp to a relative or absolute format
 * Examples: "2m", "5h", "3d", "2w", "Nov 12, 2025"
 */
export function formatTimestamp(timestamp: string | Date): string {
  const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);

  // Less than 1 minute
  if (diffSeconds < 60) {
    return 'Just now';
  }
  // Less than 1 hour
  if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  }
  // Less than 24 hours
  if (diffHours < 24) {
    return `${diffHours}h`;
  }
  // Less than 7 days
  if (diffDays < 7) {
    return `${diffDays}d`;
  }
  // Less than 4 weeks
  if (diffWeeks < 4) {
    return `${diffWeeks}w`;
  }
  // Older than 4 weeks - show full date
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  });
}
