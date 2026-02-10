import { Button } from '@/components/ui';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">About FreshCart</h1>
        <p className="text-xl text-gray-600">Bringing fresh, quality groceries to your doorstep</p>
      </div>

      <div className="space-y-12 text-gray-700">
        <section className="bg-white p-8 rounded-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed">
            FreshCart is dedicated to making healthy eating convenient and accessible to everyone. We believe that fresh, quality groceries should be just a click away, delivered straight to your door.
          </p>
        </section>

        <section className="bg-white p-8 rounded-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              '✓ Fresh produce handpicked for quality',
              '✓ Fast delivery (24-48 hours)',
              '✓ Competitive pricing',
              '✓ Wide product selection',
              '✓ Premium quality items',
              '✓ Excellent customer service'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 text-lg">
                <span className="text-green-600 font-bold">{item.split(' ')[0]}</span>
                <span>{item.substring(2)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white p-8 rounded-xl border border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment</h2>
          <p className="text-lg leading-relaxed">
            We are committed to sustainability and supporting local farmers. Every product in our store is carefully selected to ensure freshness, quality, and ethical sourcing.
          </p>
        </section>

        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 rounded-xl text-white">
          <h3 className="text-2xl font-semibold mb-4">Get Started Today</h3>
          <p className="mb-6 text-lg opacity-90">
            Browse our selection of fresh groceries and enjoy the convenience of online shopping with FreshCart.
          </p>
          <Link href="/products">
            <Button className="bg-white text-green-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
