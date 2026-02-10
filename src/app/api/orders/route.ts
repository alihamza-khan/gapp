import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { initializeDatabase } from '@/lib/productSeeding';

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



export async function POST(request: NextRequest) {
  try {
    // Initialize database if needed (cached, won't run on every request)
    await initializeDatabase();

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
        { error: 'Failed to create order' },
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
        { error: 'Failed to save order items' },
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
      { error: 'Failed to process order' },
      { status: 500 }
    );
  }
}
