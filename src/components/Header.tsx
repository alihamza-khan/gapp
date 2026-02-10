'use client';

import Link from 'next/link';
import { useHydratedCart } from '@/hooks/useCart';
import { ShoppingCart, Menu } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { getItemCount } = useHydratedCart();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl">🛒</div>
            <span className="text-xl font-bold text-green-600">FreshCart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link
            href="/cart"
            className="relative flex items-center text-gray-700 hover:text-green-600 transition-colors"
            aria-label={`Shopping cart with ${itemCount} items`}
          >
            <ShoppingCart size={24} aria-hidden="true" />
            {itemCount > 0 && (
              <span 
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                aria-label={`${itemCount} items in cart`}
              >
                {itemCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 border-t animate-slideDown">
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
