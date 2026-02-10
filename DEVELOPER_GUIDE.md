# 🛒 FreshCart - Complete Developer Guide

## Welcome to FreshCart!

This is a professional-grade grocery shopping application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Zustand**. Everything is ready to run locally with zero configuration.

---

## 🚀 Quick Start (2 Minutes)

```bash
# 1. Navigate to project
cd GroceryApp

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
# http://localhost:3000
```

That's it! The app is now running with all 30 products loaded and ready to use.

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Full project documentation |
| **SETUP.md** | Quick setup & troubleshooting |
| **IMPLEMENTATION.md** | What was built & technical specs |
| **TESTING.md** | Testing checklist |
| **This File** | Developer reference guide |

---

## 📁 Key Files to Know

### Pages (What Users See)
```
src/app/
├── page.tsx              → Homepage (/)
├── products/page.tsx     → Products listing (/products)
├── cart/page.tsx         → Shopping cart & checkout (/cart)
├── about/page.tsx        → About page (/about)
└── contact/page.tsx      → Contact page (/contact)
```

### State Management
```
src/hooks/useCart.ts      → Cart state (Zustand store)
```

### Data
```
src/lib/mockData.ts       → 30 products + 8 categories
src/lib/constants.ts      → App configuration
```

### Components
```
src/components/
├── ProductCard.tsx       → Product display card
├── Header.tsx            → Navigation bar
├── Footer.tsx            → Footer
├── Layout.tsx            → Main layout wrapper
└── ui/                   → Reusable UI components
    ├── Button.tsx
    ├── Card.tsx
    ├── Input.tsx
    ├── Select.tsx
    └── Badge.tsx
```

---

## 🎯 Understanding the Architecture

### 1. **App Router** (Next.js 15)
- `/` → Homepage
- `/products` → Product listing
- `/cart` → Shopping cart
- `/about` → About page
- `/contact` → Contact page

### 2. **Component Structure**
```
Layout (Header + Footer)
├── Page Content
    └── Components (Cards, Buttons, etc.)
```

### 3. **State Management**
- **Zustand Store**: Cart state with persistence
- **Local Storage**: Cart data survives page refresh
- **Component State**: Form data, UI toggles

### 4. **Styling**
- **Tailwind CSS**: Utility-first styling
- **Global CSS**: Animations and custom styles
- **Component CSS**: Inline Tailwind classes

---

## 🛠️ Common Tasks

### Add a New Product
Edit `src/lib/mockData.ts`:
```typescript
export const MOCK_PRODUCTS: Product[] = [
  // ... existing products ...
  {
    id: '31',
    name: 'New Product',
    description: 'Description here',
    price: 9.99,
    category_id: '1',
    category_name: 'Fresh Vegetables',
    image_url: 'https://images.unsplash.com/...',
    stock: 100,
    rating: 4.5,
    reviews_count: 10,
    is_featured: false,
  },
];
```

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#10b981',  // Change this
  secondary: '#8b5cf6',
  accent: '#f59e0b',
}
```

### Modify Shipping Cost
Edit `src/lib/constants.ts`:
```typescript
export const CART_CONFIG = {
  taxRate: 0.08,           // 8% tax
  shippingCost: 9.99,      // Change this
  freeShippingThreshold: 50, // Or this
};
```

### Add a New Page
1. Create folder: `src/app/new-page/`
2. Create file: `src/app/new-page/page.tsx`
3. Add content:
```typescript
export default function NewPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold">New Page</h1>
    </div>
  );
}
```

---

## 🔌 Integrating Supabase

### Step 1: Set Up Database
1. Go to https://app.supabase.com
2. Create new project
3. Open SQL Editor
4. Copy all from `sql/groceryapp_schema.sql`
5. Paste and execute

### Step 2: Get Credentials
In Supabase dashboard:
1. Project settings → API
2. Copy Project URL
3. Copy Anon Public Key

### Step 3: Update Environment
Create `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Step 4: Replace Mock Data
Example in `src/app/products/page.tsx`:
```typescript
// Instead of MOCK_PRODUCTS
const { data } = await supabase
  .from('products')
  .select('*')
  .eq('category_id', selectedCategory);
```

---

## 📦 Dependencies Explained

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `react` | UI library |
| `typescript` | Type safety |
| `tailwindcss` | Styling |
| `zustand` | State management |
| `lucide-react` | Icons |
| `@supabase/supabase-js` | Database client |

---

## 🎨 Customization Guide

### Colors
- Primary Green: `#10b981` (trust, freshness)
- Secondary Purple: `#8b5cf6` (premium)
- Accent Amber: `#f59e0b` (attention)

Change in `tailwind.config.js`

### Typography
Edit in `tailwind.config.js`:
```javascript
extend: {
  fontFamily: {
    sans: ['system-ui', 'sans-serif'],
  }
}
```

### Spacing
Adjust using Tailwind spacing scale:
- `p-4` = padding 1rem
- `m-8` = margin 2rem
- `gap-6` = gap 1.5rem

---

## 🐛 Debugging Tips

### See what's in state:
```typescript
const state = useCart();
console.log(state); // See all cart data
```

### Check component renders:
```typescript
useEffect(() => {
  console.log('Component mounted');
}, []);
```

### View API responses:
```typescript
const response = await supabase.from('products').select('*');
console.log(response);
```

---

## 📱 Responsive Design Breakpoints

```
mobile:  < 640px   (1 column)
sm:      640px     (2 columns)
md:      768px     (custom)
lg:      1024px    (4 columns)
xl:      1280px    (wide)
```

Use in classes: `md:grid-cols-2 lg:grid-cols-4`

---

## ♿ Accessibility Features

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliant
- Alt text on images

---

## 🚀 Deployment Checklist

Before deploying:
```bash
npm run build        # Test build
npm run type-check   # Check types
npm run lint         # Check code quality
npm start            # Test production
```

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Other Platforms
1. Run `npm run build`
2. Deploy `.next` folder
3. Set environment variables
4. Done!

---

## 📊 Performance Tips

1. **Images**: Already optimized with Next.js Image
2. **Code**: Split components for lazy loading
3. **State**: Zustand is very efficient
4. **CSS**: Tailwind purges unused styles
5. **Bundle**: Keep components small

---

## 🔐 Environment Variables

### For Supabase
```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### For Analytics (Optional)
```
NEXT_PUBLIC_GA_ID=
```

Never commit `.env.local` file!

---

## 📝 Code Standards

### Naming Conventions
- Components: PascalCase (`ProductCard.tsx`)
- Files: kebab-case or PascalCase
- Variables: camelCase (`productName`)
- Constants: UPPER_SNAKE_CASE (`MAX_ITEMS`)

### Component Structure
```typescript
'use client'; // If using hooks/state

import { Component } from 'react';
import styles from './Component.module.css';

interface ComponentProps {
  title: string;
}

export function Component({ title }: ComponentProps) {
  return <div>{title}</div>;
}
```

### Error Handling
```typescript
try {
  // Your code
} catch (error) {
  console.error('Error:', error);
  // Show user-friendly message
}
```

---

## 🧪 Testing Ideas

### Test Cart Functionality
1. Add item → Check cart count increases
2. Change quantity → Check total updates
3. Remove item → Check cart updates
4. Complete checkout → Check cart clears

### Test Filtering
1. Search for product
2. Filter by category
3. Sort by price
4. Combine filters

### Test Responsive
1. Open DevTools (F12)
2. Toggle device toolbar
3. Test on 375px, 768px, 1024px

---

## 💡 Best Practices

1. **Use TypeScript**: Catch errors before runtime
2. **Keep Components Small**: Easier to test and maintain
3. **Use Constants**: Don't hardcode values
4. **Add Comments**: Explain complex logic
5. **Handle Errors**: Show friendly messages
6. **Optimize Images**: Use Next.js Image
7. **Mobile First**: Design for small screens first
8. **Test Early**: Find issues quickly

---

## 🔗 Useful Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [Supabase](https://supabase.com)

---

## 📞 Getting Help

### Common Issues

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**npm install fails?**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Build fails?**
```bash
npm run type-check  # See type errors
npm run lint        # See lint errors
```

---

## 🎉 You're Ready!

The app is complete, tested, and ready to use. Start with:

```bash
npm install && npm run dev
```

Then explore the code and make it your own! 🚀

---

## 📋 Checklist for New Developers

- [ ] Read README.md
- [ ] Run `npm install`
- [ ] Run `npm run dev`
- [ ] Visit http://localhost:3000
- [ ] Explore the app
- [ ] Read through the code
- [ ] Try adding a product
- [ ] Try changing colors
- [ ] Test the checkout flow
- [ ] Read TESTING.md
- [ ] Make your first customization

---

**Happy Coding!** 💚

Built with passion by a Senior Full Stack Developer with 10+ years of experience.
