const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const requestCounts = new Map<string, number[]>();

export function rateLimiter(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - WINDOW_SIZE;

  const requestTimestamps = requestCounts.get(ip) || [];
  const requestsInWindow = requestTimestamps.filter(timestamp => timestamp > windowStart);

  if (requestsInWindow.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  requestsInWindow.push(now);
  requestCounts.set(ip, requestsInWindow);

  return true; // Request allowed
}

