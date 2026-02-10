-- Grocery App Database Schema
-- Run this in Supabase SQL Editor

-- Categories Table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  image_url TEXT,
  stock INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  reviews_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(20) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Order Items Table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Reviews Table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  customer_name VARCHAR(255) NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_product_id ON order_items(product_id);
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- Insert Categories
INSERT INTO categories (name, description, icon) VALUES
('Fresh Vegetables', 'Organic fresh vegetables delivered daily', '🥬'),
('Fresh Fruits', 'Seasonal and tropical fruits', '🍎'),
('Dairy & Eggs', 'Fresh milk, cheese, and eggs', '🥛'),
('Bakery', 'Fresh bread, pastries, and baked goods', '🍞'),
('Pantry', 'Essential pantry staples and dry goods', '🏺'),
('Meat & Seafood', 'Premium quality meat and fresh seafood', '🥩'),
('Beverages', 'Drinks, juices, and beverages', '🥤'),
('Snacks', 'Healthy and tasty snacks', '🍿');

-- Insert Sample Products (Vegetables)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Organic Carrots',
  'Fresh, sweet organic carrots perfect for salads and cooking',
  2.99,
  categories.id,
  'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300',
  150,
  4.5,
  12,
  TRUE
FROM categories WHERE name = 'Fresh Vegetables';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Cherry Tomatoes',
  'Sweet and juicy cherry tomatoes',
  3.49,
  categories.id,
  'https://images.unsplash.com/photo-1592924357228-91a4daadcccf?w=300',
  120,
  4.8,
  18,
  TRUE
FROM categories WHERE name = 'Fresh Vegetables';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Bell Peppers Mix',
  'Red, yellow, and green bell peppers',
  4.99,
  categories.id,
  'https://images.unsplash.com/photo-1599599810694-f3e7dd89d070?w=300',
  100,
  4.6,
  14,
  FALSE
FROM categories WHERE name = 'Fresh Vegetables';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Broccoli Florets',
  'Fresh green broccoli, cut into florets',
  3.99,
  categories.id,
  'https://images.unsplash.com/photo-1584868077829-f3af5344b5f2?w=300',
  90,
  4.7,
  10,
  FALSE
FROM categories WHERE name = 'Fresh Vegetables';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Spinach Bundle',
  'Fresh leafy spinach for salads and cooking',
  2.49,
  categories.id,
  'https://images.unsplash.com/photo-1599599810490-f82603ce8ebb?w=300',
  110,
  4.4,
  8,
  FALSE
FROM categories WHERE name = 'Fresh Vegetables';

-- Insert Sample Products (Fruits)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Red Apples',
  'Crisp and sweet red apples',
  4.49,
  categories.id,
  'https://images.unsplash.com/photo-1560806887-1295ddba4edd?w=300',
  140,
  4.7,
  16,
  TRUE
FROM categories WHERE name = 'Fresh Fruits';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Bananas (Bunch)',
  'Fresh, ripe bananas',
  1.99,
  categories.id,
  'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300',
  180,
  4.8,
  22,
  TRUE
FROM categories WHERE name = 'Fresh Fruits';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Strawberries',
  'Sweet and juicy strawberries',
  5.99,
  categories.id,
  'https://images.unsplash.com/photo-1587393855258-27ec8d759da0?w=300',
  95,
  4.9,
  24,
  FALSE
FROM categories WHERE name = 'Fresh Fruits';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Organic Blueberries',
  'Fresh organic blueberries packed with antioxidants',
  6.99,
  categories.id,
  'https://images.unsplash.com/photo-1599599810694-f3e7dd89d070?w=300',
  75,
  4.9,
  20,
  FALSE
FROM categories WHERE name = 'Fresh Fruits';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Oranges (6 Pack)',
  'Fresh juicy oranges',
  5.49,
  categories.id,
  'https://images.unsplash.com/photo-1577720643272-265f434e0b68?w=300',
  120,
  4.6,
  11,
  FALSE
FROM categories WHERE name = 'Fresh Fruits';

-- Insert Sample Products (Dairy & Eggs)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Whole Milk (1L)',
  'Fresh whole milk',
  2.99,
  categories.id,
  'https://images.unsplash.com/photo-1550583724-b2692b25a968?w=300',
  200,
  4.7,
  15,
  TRUE
FROM categories WHERE name = 'Dairy & Eggs';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Greek Yogurt (500g)',
  'Creamy Greek yogurt with live cultures',
  4.49,
  categories.id,
  'https://images.unsplash.com/photo-1488477181946-6428a0291840?w=300',
  130,
  4.8,
  18,
  FALSE
FROM categories WHERE name = 'Dairy & Eggs';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Eggs (Dozen)',
  'Fresh farm eggs from free-range hens',
  5.99,
  categories.id,
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300',
  160,
  4.9,
  21,
  TRUE
FROM categories WHERE name = 'Dairy & Eggs';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Cheddar Cheese (200g)',
  'Aged cheddar cheese',
  7.99,
  categories.id,
  'https://images.unsplash.com/photo-1628185289422-edb2ae8af344?w=300',
  85,
  4.7,
  12,
  FALSE
FROM categories WHERE name = 'Dairy & Eggs';

-- Insert Sample Products (Bakery)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Whole Wheat Bread',
  'Fresh whole wheat bread made daily',
  3.49,
  categories.id,
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300',
  100,
  4.6,
  13,
  TRUE
FROM categories WHERE name = 'Bakery';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Sourdough Bread',
  'Artisanal sourdough bread',
  5.49,
  categories.id,
  'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300',
  70,
  4.8,
  16,
  FALSE
FROM categories WHERE name = 'Bakery';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Croissants (4 Pack)',
  'Buttery French croissants',
  4.99,
  categories.id,
  'https://images.unsplash.com/photo-1585080200355-a8425f6a5316?w=300',
  90,
  4.9,
  19,
  TRUE
FROM categories WHERE name = 'Bakery';

-- Insert Sample Products (Pantry)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Olive Oil (500ml)',
  'Extra virgin olive oil',
  12.99,
  categories.id,
  'https://images.unsplash.com/photo-1510812431401-41d2cab2707d?w=300',
  50,
  4.8,
  14,
  TRUE
FROM categories WHERE name = 'Pantry';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Brown Rice (1kg)',
  'Organic brown rice',
  4.49,
  categories.id,
  'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300',
  120,
  4.7,
  10,
  FALSE
FROM categories WHERE name = 'Pantry';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Pasta Mix (500g)',
  'Assorted whole wheat pasta',
  3.49,
  categories.id,
  'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=300',
  140,
  4.6,
  9,
  FALSE
FROM categories WHERE name = 'Pantry';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Honey (500g)',
  'Raw organic honey',
  9.99,
  categories.id,
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300',
  80,
  4.9,
  17,
  FALSE
FROM categories WHERE name = 'Pantry';

-- Insert Sample Products (Meat & Seafood)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Chicken Breast (500g)',
  'Fresh boneless chicken breast',
  8.99,
  categories.id,
  'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300',
  95,
  4.8,
  15,
  TRUE
FROM categories WHERE name = 'Meat & Seafood';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Salmon Fillet (300g)',
  'Fresh wild salmon fillet',
  14.99,
  categories.id,
  'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300',
  60,
  4.9,
  18,
  FALSE
FROM categories WHERE name = 'Meat & Seafood';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Ground Beef (500g)',
  'Fresh lean ground beef',
  9.99,
  categories.id,
  'https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=300',
  85,
  4.7,
  12,
  FALSE
FROM categories WHERE name = 'Meat & Seafood';

-- Insert Sample Products (Beverages)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Orange Juice (1L)',
  'Fresh squeezed orange juice',
  4.99,
  categories.id,
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300',
  110,
  4.7,
  13,
  TRUE
FROM categories WHERE name = 'Beverages';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Green Tea (20 bags)',
  'Organic green tea bags',
  5.49,
  categories.id,
  'https://images.unsplash.com/photo-1597318155346-c7ee674d0a6b?w=300',
  95,
  4.8,
  16,
  FALSE
FROM categories WHERE name = 'Beverages';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Almond Milk (1L)',
  'Unsweetened almond milk',
  3.99,
  categories.id,
  'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300',
  130,
  4.6,
  11,
  FALSE
FROM categories WHERE name = 'Beverages';

-- Insert Sample Products (Snacks)
INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Almonds (200g)',
  'Roasted almonds',
  7.99,
  categories.id,
  'https://images.unsplash.com/photo-1585329218544-c0306e88d5ff?w=300',
  75,
  4.8,
  14,
  TRUE
FROM categories WHERE name = 'Snacks';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Popcorn (organic)',
  'Organic popcorn kernels',
  3.49,
  categories.id,
  'https://images.unsplash.com/photo-1585859375944-a0ae489fdf11?w=300',
  120,
  4.7,
  10,
  FALSE
FROM categories WHERE name = 'Snacks';

INSERT INTO products (name, description, price, category_id, image_url, stock, rating, reviews_count, is_featured) 
SELECT 
  'Dark Chocolate (85%)',
  'Premium dark chocolate bar',
  4.99,
  categories.id,
  'https://images.unsplash.com/photo-1578954550067-01c26b9b22ca?w=300',
  100,
  4.9,
  19,
  FALSE
FROM categories WHERE name = 'Snacks';
