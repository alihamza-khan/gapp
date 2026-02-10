import { supabase } from '@/lib/supabase';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';

/**
 * In-memory cache fo seeding status to avoid redundant database operations
 * Persists for the duration of the function invocation
 */
let seedingCache = {
  isInitialized: false,
  lastChecked: 0,
  cacheDuration: 5 * 60 * 1000, // 5 minutes in milliseconds
};

/**
 * Initialize database with mock data if not already done
 * This should be called once at application startup or via a health check endpoint
 * Avoids calling on every request
 */
export async function initializeDatabase() {
  try {
    const now = Date.now();

    // Check cache - skip if recently initialized
    if (seedingCache.isInitialized && now - seedingCache.lastChecked < seedingCache.cacheDuration) {
      console.log('Database already initialized (cached)');
      return true;
    }

    console.log('Initializing database...');

    // Quick check: count products to see if seeding is needed
    const { count: productCount, error: countError } = await supabase
      .from('products')
      .select('id', { count: 'exact', head: true });

    if (!countError && productCount && productCount >= MOCK_PRODUCTS.length) {
      console.log(`Database already contains ${productCount} products`);
      seedingCache.isInitialized = true;
      seedingCache.lastChecked = now;
      return true;
    }

    // Seed categories
    console.log('Seeding categories...');
    const { error: categoriesError } = await supabase
      .from('categories')
      .upsert(
        MOCK_CATEGORIES.map(cat => ({
          id: cat.id,
          name: cat.name,
          description: cat.description,
          icon: cat.icon,
        })),
        { onConflict: 'id' }
      );

    if (categoriesError) {
      throw new Error(`Failed to seed categories: ${categoriesError.message}`);
    }

    // Seed products
    console.log('Seeding products...');
    const { error: productsError } = await supabase
      .from('products')
      .upsert(
        MOCK_PRODUCTS.map(prod => ({
          id: prod.id,
          name: prod.name,
          description: prod.description,
          price: prod.price,
          category_id: prod.category_id,
          image_url: prod.image_url,
          stock: prod.stock,
          rating: prod.rating,
          reviews_count: prod.reviews_count,
          is_featured: prod.is_featured,
        })),
        { onConflict: 'id' }
      );

    if (productsError) {
      throw new Error(`Failed to seed products: ${productsError.message}`);
    }

    console.log('Database initialized successfully');
    seedingCache.isInitialized = true;
    seedingCache.lastChecked = now;
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

/**
 * Reset the seeding cache (useful for testing or manual reset)
 */
export function resetSeedingCache() {
  seedingCache = {
    isInitialized: false,
    lastChecked: 0,
    cacheDuration: 5 * 60 * 1000,
  };
}

/**
 * Get seeding status
 */
export function getSeedingStatus() {
  return {
    isInitialized: seedingCache.isInitialized,
    lastChecked: new Date(seedingCache.lastChecked),
    cacheValid: Date.now() - seedingCache.lastChecked < seedingCache.cacheDuration,
  };
}
