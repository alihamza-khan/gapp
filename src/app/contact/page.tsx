'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">
          Have questions? We&apos;d love to hear from you. Get in touch today.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            icon: Phone,
            title: 'Phone',
            value: '1-800-FRESH-CART',
          },
          {
            icon: Mail,
            title: 'Email',
            value: 'support@freshcart.com',
          },
          {
            icon: MapPin,
            title: 'Address',
            value: '123 Fresh St, Green City, GC 12345',
          },
        ].map((contact, idx) => {
          const Icon = contact.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <Icon size={28} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {contact.title}
              </h3>
              <p className="text-gray-600">{contact.value}</p>
            </div>
          );
        })}
      </div>

      {/* Contact Form */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h2>

        {submitted && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-slideUp">
            <p className="text-green-700 font-semibold flex items-center gap-2">
              <span className="text-2xl">✓</span>
              Message sent successfully! We&apos;ll get back to you soon.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <Input
                id="name"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email
              </label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
              Subject
            </label>
            <Input
              id="subject"
              placeholder="How can we help?"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Tell us more about your inquiry..."
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              required
              aria-required="true"
            />
          </div>

          <Button type="submit" className="w-full py-3 text-lg font-semibold">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
