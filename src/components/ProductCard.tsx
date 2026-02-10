'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui';
import { Card, CardContent, CardFooter } from './ui/Card';
import { Badge } from './ui/Badge';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { Product } from '@/lib/mockData';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image_url: product.image_url,
    });
    setAddedToCart(true);
    const timer = setTimeout(() => setAddedToCart(false), 2500);
    return () => clearTimeout(timer);
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        {product.is_featured && (
          <Badge className="absolute top-3 right-3 z-10" variant="success">
            Featured
          </Badge>
        )}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"></div>
        )}
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Content */}
      <CardContent className="flex-1 pt-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-900 hover:text-green-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="text-sm text-gray-600 line-clamp-2 mt-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(product.rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews_count})
          </span>
        </div>

        {/* Stock Status */}
        <div className="mt-3">
          {product.stock > 0 ? (
            <Badge variant="success" className="text-xs">
              In Stock ({product.stock})
            </Badge>
          ) : (
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-3">
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </div>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block mt-1">
              {product.category_name}
            </span>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full flex items-center justify-center gap-2 transition-all ${
            addedToCart 
              ? 'bg-green-700 hover:bg-green-800' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
          size="sm"
        >
          <ShoppingCart size={16} />
          {addedToCart ? '✓ Added!' : 'Add to Cart'}
        </Button>
      </CardFooter>
    </Card>
  );
}
