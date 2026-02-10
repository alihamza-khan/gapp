import { NextRequest, NextResponse } from 'next/server';

/**
 * Middleware for security headers, request logging, and other cross-cutting concerns
 * Runs on all requests (can be configured with matcher)
 */
export function middleware(request: NextRequest) {
  // Create response (either from rewrite or default passthrough)
  const response = NextResponse.next();

  // Security Headers
  // Content Security Policy - prevents XSS attacks
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://rltpcldfgmarxfbmflgl.supabase.co;"
  );

  // Prevent clickjacking attacks
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');

  // Prevent MIME sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff');

  // Enable XSS protection (for older browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Referrer Policy - controls how much referrer info is shared
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  // Permissions Policy - control which browser features can be used
  response.headers.set(
    'Permissions-Policy',
    'geolocation=(), microphone=(), camera=(), payment=()'
  );

  // Performance & Optimization Headers
  // Enable compression suggestions
  response.headers.set('Vary', 'Accept-Encoding');

  // Request logging for monitoring
  // In production, consider sending to external logging service
  const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  const timestamp = new Date().toISOString();
  const method = request.method;
  const pathname = request.nextUrl.pathname;

  // Log request details (visible in Vercel logs)
  console.log(`[${timestamp}] ${requestId} - ${method} ${pathname}`);

  // Add request ID to response headers for tracing
  response.headers.set('X-Request-ID', requestId);
  response.headers.set('X-Response-Time', new Date().getTime().toString());

  return response;
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    // Run middleware on all routes except:
    // - _next (Next.js internal files)
    // - favicon.ico, robots.txt, sitemap.xml (static assets)
    '/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
