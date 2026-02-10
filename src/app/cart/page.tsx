'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = getTotal();
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const shipping = subtotal > 50 ? 0 : 9.99; // Free shipping over $50
  const total = subtotal + tax + shipping;

  if (items.length === 0 && !showCheckout) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center py-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-6">
            <ShoppingBag size={40} className="text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8 text-lg">
            Explore our fresh selection and add items to your cart!
          </p>
          <Link href="/products">
            <Button className="inline-flex items-center gap-2">
              <ShoppingBag size={20} />
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      {!showCheckout ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>
                  Items ({items.reduce((sum, item) => sum + item.quantity, 0)})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b">
                      {/* Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <Image
                          src={item.image_url}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <Link href={`/products/${item.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-green-600">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-lg font-bold text-green-600 mt-2">
                          ${item.price.toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden w-fit mt-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(0, item.quantity - 1))
                            }
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={18} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.id, parseInt(e.target.value) || 0)
                            }
                            className="w-12 text-center border-l border-r border-gray-300 py-2 font-semibold focus:outline-none focus:ring-2 focus:ring-green-500"
                            min="0"
                            aria-label="Product quantity"
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-2 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                      </div>

                      {/* Price & Remove */}
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900 mb-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors px-3 py-2 rounded-lg inline-flex items-center gap-1"
                          aria-label={`Remove ${item.name} from cart`}
                        >
                          <Trash2 size={18} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Promo Code */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="sm">
                    Apply
                  </Button>
                </div>

                {/* Totals */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (8%):</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping:</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-semibold">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">
                      ✓ Free shipping on orders over $50
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
                    <span>Total:</span>
                    <span className="text-green-600">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full mb-3"
                    onClick={() => setShowCheckout(true)}
                  >
                    Proceed to Checkout
                  </Button>
                  <Link href="/products">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ) : (
        <CheckoutForm
          total={total}
          items={items}
          onBack={() => setShowCheckout(false)}
          onSuccess={() => clearCart()}
        />
      )}
    </div>
  );
}

function CheckoutForm({
  total,
  items,
  onBack,
  onSuccess,
}: {
  total: number;
  items: any[];
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          items,
          total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to place order. Please try again.');
        setIsLoading(false);
        return;
      }

      // Success! Show confirmation
      setOrderNumber(data.orderNumber);
      setOrderPlaced(true);
      onSuccess(); // Clear the cart
    } catch (err) {
      console.error('Order submission error:', err);
      setError('An error occurred while placing your order. Please try again.');
      setIsLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h2>
            <p className="text-gray-600 mb-4">
              Thank you for your purchase. Your order has been placed successfully.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-600">Order Number</p>
              <p className="text-2xl font-bold text-green-600">{orderNumber}</p>
            </div>
            <p className="text-gray-600 mb-8">
              You will receive an email confirmation shortly with tracking details.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button>Back to Home</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
                <Input
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  placeholder="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Delivery Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Delivery Address
              </h3>
              <Input
                placeholder="Street Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="mb-4"
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
                <Input
                  placeholder="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Information
              </h3>
              <Input
                placeholder="Card Number (demo: 4111 1111 1111 1111)"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                This is a demo checkout. No real payment will be processed.
              </p>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between font-semibold text-gray-900">
                <span>Order Total:</span>
                <span className="text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <Button 
                type="button" 
                onClick={onBack} 
                variant="outline" 
                className="flex-1"
                disabled={isLoading}
              >
                Back
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isLoading}
              >
                {isLoading ? 'Placing Order...' : 'Place Order'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
