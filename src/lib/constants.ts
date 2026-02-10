// App Configuration
export const APP_CONFIG = {
  name: 'FreshCart',
  description: 'Your trusted online grocery store',
  domain: 'localhost:3000',
  version: '1.0.0',
};

// Cart Settings
export const CART_CONFIG = {
  taxRate: 0.08, // 8%
  shippingCost: 9.99,
  freeShippingThreshold: 50,
};

// Pagination
export const PAGINATION = {
  productsPerPage: 20,
  categoriesPerPage: 8,
};

// Sorting Options
export const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-low' },
  { label: 'Price: High to Low', value: 'price-high' },
  { label: 'Highest Rating', value: 'rating' },
];

// Status Messages
export const MESSAGES = {
  addedToCart: 'Product added to cart!',
  removedFromCart: 'Product removed from cart',
  checkoutSuccess: 'Order placed successfully!',
  error: 'Something went wrong. Please try again.',
};

// Routes
export const ROUTES = {
  home: '/',
  products: '/products',
  cart: '/cart',
  about: '/about',
  contact: '/contact',
};

// Default Values
export const DEFAULTS = {
  image: 'https://via.placeholder.com/300x300?text=No+Image',
  rating: 0,
  reviewsCount: 0,
  stock: 0,
};
