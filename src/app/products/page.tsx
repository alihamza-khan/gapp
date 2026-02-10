'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Input, Select, Button } from '@/components/ui';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '@/lib/mockData';
import { Search, X } from 'lucide-react';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let results = MOCK_PRODUCTS;

    // Filter by search
    if (searchQuery) {
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter((p) => p.category_id === selectedCategory);
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
        results.sort((_a, b) => (b.is_featured ? 1 : -1));
        break;
      default:
        break;
    }

    return results;
  }, [searchQuery, selectedCategory, sortBy]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop Products</h1>
        <p className="text-gray-600">
          Browse our selection of {filteredProducts.length} fresh products
        </p>
      </div>

      {/* Filters Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search products"
            />
          </div>

          {/* Category Filter */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={[
              { label: 'All Categories', value: '' },
              ...MOCK_CATEGORIES.map((cat) => ({
                label: cat.name,
                value: cat.id,
              })),
            ]}
          />

          {/* Sort */}
          <Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            options={[
              { label: 'Featured', value: 'featured' },
              { label: 'Price: Low to High', value: 'price-low' },
              { label: 'Price: High to Low', value: 'price-high' },
              { label: 'Highest Rating', value: 'rating' },
            ]}
          />

          {/* Clear Filters */}
          {(searchQuery || selectedCategory) && (
            <Button
              onClick={handleClearFilters}
              variant="outline"
              className="flex items-center justify-center gap-2"
            >
              <X size={18} />
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredProducts.length}</span>{' '}
          product{filteredProducts.length !== 1 ? 's' : ''}
          {selectedCategory &&
            ` in ${MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.name}`}
        </p>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-3">
            No products found
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            Try adjusting your search or filter criteria
          </p>
          <Button onClick={handleClearFilters} className="inline-flex items-center gap-2">
            <X size={20} />
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
