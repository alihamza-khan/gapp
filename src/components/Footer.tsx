import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white mt-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🛒</div>
              <span className="text-xl font-bold text-green-400">FreshCart</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted online grocery store for fresh, quality products delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-green-400 transition-colors hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all hover:scale-125" aria-label="Facebook">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all hover:scale-125" aria-label="Twitter">
                <Twitter size={22} />
              </a>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-all hover:scale-125" aria-label="Instagram">
                <Instagram size={22} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between text-gray-400 text-sm gap-4">
          <p>&copy; {currentYear} FreshCart. All rights reserved.</p>
          <p>Made with ❤️ by the FreshCart Team</p>
        </div>
      </div>
    </footer>
  );
}
