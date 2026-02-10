# FreshCart - Professional Grocery App

A beautiful, modern, and fully-functional grocery shopping application built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Zustand** for state management. Perfect for local development with mock data included.

## 🚀 Features

- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Product Browsing**: Browse 30+ fresh grocery products across 8 categories
- **Advanced Filtering**: Search, filter by category, and sort products
- **Shopping Cart**: Add/remove items, adjust quantities with Zustand state management
- **Checkout Flow**: Complete checkout experience with order confirmation
- **Responsive Design**: Fully mobile-friendly layout
- **Performance**: Optimized images, fast load times
- **Error Handling**: Comprehensive error boundaries and loading states
- **Mock Data**: 30+ realistic grocery products pre-loaded

## 📋 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── products/          # Products listing page
│   ├── cart/              # Shopping cart page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components (Button, Card, Input, etc.)
│   ├── Header.tsx        # Navigation header
│   ├── Footer.tsx        # Footer component
│   ├── Layout.tsx        # Main layout wrapper
│   └── ProductCard.tsx   # Product card component
├── hooks/                 # Custom React hooks
│   └── useCart.ts        # Cart state management with Zustand
├── lib/                   # Utilities and helpers
│   ├── supabase.ts       # Supabase client (ready for integration)
│   └── mockData.ts       # Mock products and categories
└── public/               # Static assets

sql/
└── groceryapp_schema.sql  # Database schema (ready for Supabase)
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom Shadcn-inspired components
- **State Management**: Zustand
- **Icons**: Lucide React
- **Database Ready**: Supabase (schema provided)
- **Image Optimization**: Next.js Image component

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm, yarn, or pnpm

### Installation

1. **Navigate to project directory**
   ```bash
   cd GroceryApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📝 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type check
npm run type-check
```

## 🎯 Features Walkthrough

### Homepage
- Hero section with call-to-action
- Benefits showcase
- Category browsing grid
- Featured products section
- CTA section

### Products Page
- Full product listing (30 items)
- Advanced search functionality
- Category filtering
- Price and rating sorting
- Responsive grid layout

### Shopping Cart
- Add/remove items
- Adjust quantities
- Real-time total calculation
- Tax calculation (8%)
- Free shipping on orders over $50
- Complete checkout form

### Checkout
- Customer information form
- Delivery address collection
- Payment information (demo)
- Order confirmation with order number

## 🔧 Configuration

### Environment Variables
No environment variables required for local demo! The app uses mock data.

If you want to integrate Supabase later:
1. Copy `.env.example` to `.env.local`
2. Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

## 📦 Supabase Integration (Optional)

The project is ready for Supabase integration. To set up:

1. **Create Supabase Project**: https://app.supabase.com
2. **Open SQL Editor** in your Supabase dashboard
3. **Copy and paste** the contents of `sql/groceryapp_schema.sql`
4. **Execute** the SQL to create tables and seed data
5. **Update `.env.local`** with your Supabase credentials
6. **Replace mock data imports** with Supabase queries

## 🎨 UI Components

Pre-built, reusable components available in `src/components/ui/`:

- **Button**: Multiple variants (default, secondary, outline, destructive)
- **Card**: Flexible card container with header, content, footer
- **Input**: Form input with validation support
- **Select**: Dropdown select with options
- **Badge**: Status badges with multiple variants

## 📊 Mock Data

The app comes with 30 pre-loaded products across 8 categories:
- Fresh Vegetables (5 items)
- Fresh Fruits (5 items)
- Dairy & Eggs (4 items)
- Bakery (3 items)
- Pantry (4 items)
- Meat & Seafood (3 items)
- Beverages (3 items)
- Snacks (3 items)

All products include:
- Product images (from Unsplash)
- Price information
- Stock levels
- Customer ratings
- Product descriptions

## 🚀 Performance Optimizations

- ✅ Image optimization with Next.js Image component
- ✅ Lazy loading of products
- ✅ Efficient state management with Zustand
- ✅ CSS modules and Tailwind CSS for minimal bundle size
- ✅ Server-side rendering where applicable
- ✅ Responsive design for all screen sizes

## 🐛 Error Handling

- Graceful error states on all pages
- Loading states for asynchronous operations
- Form validation on checkout
- Fallback UI for empty states

## 🔐 Security

- Type-safe TypeScript throughout
- No sensitive data in client code
- CORS-ready for API integration
- Environment variable protection

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Learning Resources

This project is perfect for learning:
- Next.js 15 App Router
- TypeScript best practices
- Tailwind CSS styling
- React hooks and state management
- E-commerce features
- Responsive web design

## 📄 License

This project is open source and available for educational and commercial use.

## 👨‍💻 Author

Built with ❤️ by a Senior Full Stack Developer with 10+ years of experience.

---

## 🎉 Ready to Deploy?

The app is production-ready. To deploy:

1. **To Vercel** (recommended):
   ```bash
   npm install -g vercel
   vercel
   ```

2. **To other platforms**: Build with `npm run build` and deploy the `.next` folder

## 📞 Support

For issues, questions, or improvements, feel free to create an issue or contact the development team.

Enjoy shopping with FreshCart! 🛒
