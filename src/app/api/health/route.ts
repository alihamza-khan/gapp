import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { initializeDatabase, getSeedingStatus } from '@/lib/productSeeding';
import { createCachedResponse, CACHE_DURATIONS } from '@/lib/cache';

/**
 * Health check endpoint for monitoring and deployment verification
 * Used by Vercel and monitoring services to verify application health
 */
export async function GET() {
  try {
    const startTime = Date.now();
    const healthStatus: Record<string, any> = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };

    // Check Supabase connectivity
    try {
      const { error } = await supabase
        .from('products')
        .select('id')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 means no rows returned, which is fine
        throw error;
      }

      healthStatus.database = {
        status: 'connected',
        accessible: true,
      };
    } catch (dbError) {
      console.error('Database health check failed:', dbError);
      healthStatus.database = {
        status: 'error',
        accessible: false,
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
      };
    }

    // Check database initialization status
    try {
      await initializeDatabase();
      const seedingStatus = getSeedingStatus();
      healthStatus.seeding = {
        initialized: seedingStatus.isInitialized,
        lastChecked: seedingStatus.lastChecked,
        cacheValid: seedingStatus.cacheValid,
      };
    } catch (seedError) {
      console.error('Database initialization check failed:', seedError);
      healthStatus.seeding = {
        initialized: false,
        error: seedError instanceof Error ? seedError.message : 'Unknown error',
      };
    }

    // Check environment variables
    healthStatus.environment = {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasSupabaseKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasSeedSecret: !!process.env.SEED_API_SECRET,
    };

    // Overall status
    const isHealthy = healthStatus.database?.accessible && healthStatus.seeding?.initialized;
    if (!isHealthy) {
      healthStatus.status = 'degraded';
    }

    const responseTime = Date.now() - startTime;
    healthStatus.responseTime = `${responseTime}ms`;

    // Cache health checks for 30 seconds to reduce overhead
    return createCachedResponse(healthStatus, CACHE_DURATIONS.SHORT, {
      isPublic: false,
      status: isHealthy ? 200 : 503,
    });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
      },
      { status: 500 }
    );
  }
}
