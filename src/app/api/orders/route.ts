import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { MOCK_CATEGORIES, MOCK_PRODUCTS } from '@/lib/mockData';

// Helper to convert old numeric IDs to new UUID format
function convertProductIdToUUID(id: string): string {
  // If it's a valid UUID format, return as-is
  if (id.includes('-')) {
    return id;
  }

  // Convert numeric string to padded UUID
  const numId = parseInt(id, 10);
  if (numId >= 1 && numId <= 30) {
    return `20000000-0000-0000-0000-${String(numId).padStart(12, '0')}`;
  }

  // Return as-is for unknown formats
  return id;
}

// Ensure products exist in the database with correct UUIDs
async function ensureProductsSeeded() {
  try {
    console.log('Seeding products and categories...');

    // Always upsert to ensure we have the right format
    console.log('Upserting categories...');
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
      throw new Error(`Failed to seed categories: ${categoriesError.message}`);
    }

    console.log(`Upserted ${MOCK_CATEGORIES.length} categories`);

    console.log('Upserting products...');
    // Upsert products - this will insert new ones and update existing ones
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
      throw new Error(`Failed to seed products: ${productsError.message}`);
    }

    console.log(`Upserted ${MOCK_PRODUCTS.length} products`);
    return true;
  } catch (error) {
    console.error('Error in ensureProductsSeeded:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zipCode,
      items,
      total,
    } = body;

    console.log('=== ORDER SUBMISSION START ===');
    console.log('Customer:', { firstName, lastName, email });
    console.log('Items count:', items?.length);
    console.log('Total:', total);

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !address || !city || !zipCode) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Ensure products are seeded before saving order
    console.log('Ensuring products are seeded...');
    await ensureProductsSeeded();

    // Generate order number
    const orderNumber = `ORD-${Date.now()}`;
    const customerName = `${firstName} ${lastName}`;

    console.log('Creating order:', orderNumber);

    // 1. Insert order into orders table
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderNumber,
        customer_name: customerName,
        customer_email: email,
        customer_phone: phone,
        delivery_address: `${address}, ${city} ${zipCode}`,
        total_amount: parseFloat(total.toString()),
        status: 'pending',
        created_at: new Date().toISOString(),
      })
      .select('id')
      .single();

    if (orderError || !orderData) {
      console.error('Error creating order:', orderError);
      return NextResponse.json(
        { error: 'Failed to create order: ' + (orderError?.message || 'Unknown error') },
        { status: 500 }
      );
    }

    console.log('Order created with ID:', orderData.id);

    // 2. Insert order items into order_items table with converted IDs
    const orderItems = items.map((item: any) => {
      const convertedId = convertProductIdToUUID(String(item.id));
      console.log(`Item: ${item.name} (${item.id} -> ${convertedId}), Qty: ${item.quantity}, Price: $${item.price}`);
      
      return {
        order_id: orderData.id,
        product_id: convertedId,
        quantity: parseInt(item.quantity.toString(), 10),
        price_at_purchase: parseFloat(item.price.toString()),
      };
    });

    console.log('Inserting order items:', orderItems.length);
    const { error: itemsError, data: itemsData } = await supabase
      .from('order_items')
      .insert(orderItems)
      .select();

    if (itemsError) {
      console.error('ERROR creating order items:', itemsError);
      
      // Try to delete the order if items insertion fails
      await supabase.from('orders').delete().eq('id', orderData.id);
      
      return NextResponse.json(
        { 
          error: `Failed to save order items: ${itemsError.message}`,
          code: itemsError.code 
        },
        { status: 500 }
      );
    }

    console.log('Order items saved successfully:', itemsData?.length);
    console.log('=== ORDER SUBMISSION COMPLETE ===');

    // Return success response
    return NextResponse.json(
      {
        success: true,
        orderNumber,
        orderId: orderData.id,
        message: 'Order created and saved to database successfully',
        itemsCount: orderItems.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('=== ORDER SUBMISSION ERROR ===');
    console.error('Error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error: ' + (error instanceof Error ? error.message : 'Unknown'),
        details: error instanceof Error ? error.stack : undefined 
      },
      { status: 500 }
    );
  }
}
