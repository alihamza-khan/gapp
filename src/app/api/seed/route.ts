import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';

/**
 * Admin-only seed endpoint for initializing database with mock data
 * Requires SEED_API_SECRET header to prevent unauthorized access
 */
export async function POST(request: NextRequest) {
  try {
    // Verify admin access
    const authHeader = request.headers.get('x-seed-secret');
    const expectedSecret = process.env.SEED_API_SECRET;

    if (!expectedSecret) {
      console.error('SEED_API_SECRET not configured');
      return NextResponse.json(
        { error: 'Seed endpoint not available' },
        { status: 503 }
      );
    }

    if (!authHeader || authHeader !== expectedSecret) {
      console.warn('Unauthorized seed attempt');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Starting database seeding (authenticated)...');

    // 1. Seed categories
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
      console.error('Error seeding categories:', categoriesError);
      return NextResponse.json(
        { error: 'Failed to seed categories' },
        { status: 500 }
      );
    }

    // 2. Seed products
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
      console.error('Error seeding products:', productsError);
      return NextResponse.json(
        { error: 'Failed to seed products' },
        { status: 500 }
      );
    }

    console.log('Database seeded successfully');

    return NextResponse.json(
      {
        success: true,
        message: 'Database seeded successfully',
        categories: MOCK_CATEGORIES.length,
        products: MOCK_PRODUCTS.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Seeding error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
