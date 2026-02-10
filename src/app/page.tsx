'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { ProductCard } from '@/components/ProductCard';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData';
import { ArrowRight, Truck, Shield, Clock } from 'lucide-react';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.is_featured).slice(0, 8);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-50 to-emerald-50 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="animate-slideUp">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fresh Groceries Delivered to Your <span className="text-green-600">Doorstep</span>
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Shop from hundreds of fresh products, handpicked for quality. Save time, eat better, live healthier.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button className="w-full sm:w-auto flex items-center justify-center gap-2">
                    Start Shopping <ArrowRight size={20} />
                  </Button>
                </Link>
                <button className="px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Fresh Groceries"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-yellow-200 rounded-full opacity-50"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-green-200 rounded-full opacity-30"></div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: 'Fast Delivery',
                description: 'Get your groceries delivered within 24-48 hours',
              },
              {
                icon: Shield,
                title: 'Quality Guaranteed',
                description: 'Fresh produce handpicked for quality and taste',
              },
              {
                icon: Clock,
                title: 'Save Time',
                description: 'Shop online and save hours of shopping time',
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Icon size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Shop by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MOCK_CATEGORIES.map((category) => (
              <Link key={category.id} href={`/products?category=${category.id}`}>
                <div className="bg-white p-8 rounded-xl text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group border border-gray-100 hover:border-green-200">
                  <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors text-lg">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Featured Products
            </h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Shop Fresh?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Browse our complete selection of fresh groceries and enjoy fast, convenient delivery.
          </p>
          <Link href="/products">
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Start Shopping Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
