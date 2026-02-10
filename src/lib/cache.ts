import { NextResponse } from 'next/server';
import type { NextResponseInit } from 'next/server';

/**
 * Cache duration options in seconds
 */
export const CACHE_DURATIONS = {
  SHORT: 60, // 1 minute
  MEDIUM: 5 * 60, // 5 minutes
  LONG: 60 * 60, // 1 hour
  VERY_LONG: 24 * 60 * 60, // 24 hours
} as const;

/**
 * Create appropriate Cache-Control header for HTTP responses
 *
 * @param duration Duration in seconds
 * @param isPublic Whether the response can be cached by CDN/public caches
 * @returns Cache-Control header value
 *
 * @example
 * // Cache for 5 minutes in CDN and browser
 * getCacheControl(300, true)
 * // Returns: "public, max-age=300, s-maxage=300"
 *
 * // Cache for 1 minute in browser only
 * getCacheControl(60, false)
 * // Returns: "private, max-age=60"
 */
export function getCacheControl(duration: number, isPublic = true): string {
  if (isPublic) {
    return `public, max-age=${duration}, s-maxage=${duration}`;
  }
  return `private, max-age=${duration}`;
}

/**
 * Create a response with proper cache headers
 *
 * @param data Response data
 * @param duration Cache duration in seconds (default: 5 minutes)
 * @param options Additional NextResponse init options
 * @returns NextResponse with cache headers
 *
 * @example
 * return createCachedResponse({ data: 'example' }, 300);
 */
export function createCachedResponse<T>(
  data: T,
  duration = CACHE_DURATIONS.MEDIUM,
  options?: NextResponseInit & { isPublic?: boolean }
): NextResponse {
  const { isPublic = true, ...otherOptions } = options || {};

  return NextResponse.json(data, {
    ...otherOptions,
    headers: {
      'Cache-Control': getCacheControl(duration, isPublic),
      ...(otherOptions?.headers || {}),
    },
  });
}

/**
 * Add cache headers to an existing response
 *
 * @param response Existing response
 * @param duration Cache duration in seconds
 * @param isPublic Whether the response can be cached publicly
 * @returns Response with cache headers added
 *
 * @example
 * const response = NextResponse.json({ data: 'example' });
 * return addCacheHeaders(response, 300);
 */
export function addCacheHeaders(
  response: NextResponse,
  duration = CACHE_DURATIONS.MEDIUM,
  isPublic = true
): NextResponse {
  response.headers.set('Cache-Control', getCacheControl(duration, isPublic));
  return response;
}

/**
 * Create a response with immediate expiration (no caching)
 * Used for dynamic/personalized responses
 */
export function createNoCacheResponse<T>(
  data: T,
  options?: NextResponseInit
): NextResponse {
  return NextResponse.json(data, {
    ...options,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
      ...(options?.headers || {}),
    },
  });
}
