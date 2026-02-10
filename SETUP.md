# FreshCart Quick Setup Guide

## 🚀 Start Fresh Cart Immediately

### Step 1: Install Dependencies
```bash
cd GroceryApp
npm install
```

This will install all required packages including:
- Next.js 15
- React 18
- Tailwind CSS
- Zustand (state management)
- Lucide React (icons)

### Step 2: Run Development Server
```bash
npm run dev
```

The app will start at `http://localhost:3000`

### Step 3: Open in Browser
Visit **http://localhost:3000** and start exploring!

---

## 🎯 What You Get

✅ **30+ Mock Products** - Pre-loaded with realistic grocery items
✅ **8 Categories** - Vegetables, Fruits, Dairy, Bakery, Pantry, Meat, Beverages, Snacks
✅ **Full Shopping Flow** - Browse → Filter → Add to Cart → Checkout
✅ **Beautiful UI** - Modern, responsive design
✅ **Zero Configuration** - Works out of the box!

---

## 📱 Test the Features

### Homepage
- Browse featured products
- See all 8 categories
- Click "Start Shopping"

### Products Page
- Search for products (e.g., "apple")
- Filter by category
- Sort by price or rating
- Add items to cart

### Shopping Cart
- View all items
- Adjust quantities
- See real-time totals with tax & shipping
- Complete checkout process

### Checkout
- Fill customer details
- Enter delivery address
- Get order confirmation with order number

---

## 🗄️ Database Setup (Optional)

To connect to Supabase:

1. Create account at https://app.supabase.com
2. Create new project
3. Go to SQL Editor
4. Copy all code from `sql/groceryapp_schema.sql`
5. Paste and execute in SQL editor
6. Copy your Supabase credentials
7. Create `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here
   ```
8. Replace mock data with real database queries

---

## 📁 Project Files Overview

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage |
| `src/app/products/page.tsx` | Products listing |
| `src/app/cart/page.tsx` | Shopping cart & checkout |
| `src/components/ProductCard.tsx` | Product card component |
| `src/hooks/useCart.ts` | Cart state management |
| `src/lib/mockData.ts` | All mock products & categories |
| `sql/groceryapp_schema.sql` | Database schema for Supabase |

---

## 🎨 Customization Ideas

### Change Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#10b981',    // Change primary color
  secondary: '#8b5cf6',  // Change secondary
  accent: '#f59e0b',     // Change accent
}
```

### Add More Products
Edit `src/lib/mockData.ts` and add to `MOCK_PRODUCTS` array

### Update Product Images
Change image URLs in `MOCK_PRODUCTS` to your own images

### Modify Prices
Edit price values in `MOCK_PRODUCTS`

### Add New Categories
Add to `MOCK_CATEGORIES` array

---

## 🚨 Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### npm install fails
```bash
rm -rf node_modules package-lock.json
npm install
```

### Images not loading
Check image URLs - they use Unsplash. Ensure you have internet connection.

---

## 📦 Build for Production

```bash
npm run build
npm start
```

---

## 🎓 Next Steps

1. ✅ Run the app locally
2. 🗄️ Optional: Connect Supabase database
3. 🔐 Optional: Add authentication
4. 💳 Optional: Integrate payment (Stripe)
5. 🚀 Deploy to Vercel, AWS, or your platform

---

## 💡 Pro Tips

- Cart data is saved in browser localStorage automatically
- All product images are optimized
- Mobile responsive design works perfect on phones
- Zustand state management is super fast
- No API keys needed for demo mode

---

## 📞 Quick Help

**Having issues?** Check these:
- Node.js version: `node --version` (needs 18+)
- npm version: `npm --version` (needs 8+)
- Port 3000 available: `lsof -i :3000` (or `netstat -ano | findstr :3000` on Windows)

---

Enjoy! 🛒 Happy shopping with FreshCart!
