import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';

export async function POST() {
  try {
    console.log('Starting database seeding...');

    // 1. Seed categories
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
      console.error('Error seeding categories:', categoriesError);
      return NextResponse.json(
        { error: 'Failed to seed categories', details: categoriesError.message },
        { status: 500 }
      );
    }

    console.log(`Successfully seeded ${MOCK_CATEGORIES.length} categories`);

    // 2. Seed products
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
      console.error('Error seeding products:', productsError);
      return NextResponse.json(
        { error: 'Failed to seed products', details: productsError.message },
        { status: 500 }
      );
    }

    console.log(`Successfully seeded ${MOCK_PRODUCTS.length} products`);

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
      { error: 'Internal server error during seeding', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Allow seeding via GET request as well
  return POST();
}
