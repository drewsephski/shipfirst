'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { CartItem } from '@/types/boilerplate';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Shield } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useCart();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    saveInfo: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const subtotal = cartItems.reduce((sum: number, item: CartItem) => sum + (parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Processing payment with:', formData);
      setOrderComplete(true);
      clearCart();
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-zinc-300 mb-8 max-w-md mx-auto">Looks like you haven&apos;t added anything to your cart yet. Start shopping to find amazing products!</p>
          <Link
            href="/marketplace"
            className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl shadow-lg text-black bg-[#FFBE18] hover:bg-[#ffd35c] transition-colors"
          >
            Browse Boilerplates
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-zinc-300 text-lg mb-12 max-w-2xl mx-auto"
          >
            Thank you for your purchase! We&apos;ve sent a confirmation email with your order details and tracking information.
          </motion.p>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-8 max-w-2xl mx-auto mb-12 text-left border border-zinc-700/50 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-700">
              <h3 className="text-xl font-semibold text-white">Order Summary</h3>
              <span className="text-sm bg-zinc-700/50 text-green-400 px-3 py-1 rounded-full">Paid</span>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-between">
                <span className="text-zinc-400">Order Number</span>
                <span className="font-medium">{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date</span>
                <span>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Total</span>
                <span className="font-semibold text-lg text-white">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Payment Method</span>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-4 bg-zinc-600 rounded-sm flex items-center justify-center">
                    <Shield className="w-3 h-3 text-white" />
                  </div>
                  <span>•••• 4242</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-zinc-700">
              <h4 className="font-medium mb-4">What&apos;s next?</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-500 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-zinc-300">You&apos;ll receive an order confirmation email shortly</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-500 flex-shrink-0 mt-0.5 flex items-center justify-center">
                    <span className="text-xs text-white">2</span>
                  </div>
                  <p className="text-sm text-zinc-300">Your order is being processed and will be ready for download soon</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/marketplace" 
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-xl text-black bg-[#FFBE18] hover:bg-[#ffd35c] transition-colors shadow-lg hover:shadow-[#ffd35c]/30"
            >
              Continue Shopping
            </Link>
            <Link 
              href="/dashboard/orders" 
              className="inline-flex items-center justify-center px-8 py-3.5 border border-zinc-700 text-base font-medium rounded-xl text-white bg-zinc-800 hover:bg-zinc-700/50 transition-colors"
            >
              View My Orders
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-800 text-white">
      <div className="container mx-auto px-4 py-16 sm:py-20">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-300">Checkout</h1>
          <p className="text-lg text-zinc-400">Complete your purchase with confidence</p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#FFBE18] to-amber-400 mt-4 rounded-full"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Billing Information */}
          <div className="lg:col-span-2">
            <motion.div 
              className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-6">Billing Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Progress indicator */}
                  <div className="col-span-2 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#FFBE18]">Contact</span>
                      <span className="text-sm text-zinc-500">Payment</span>
                      <span className="text-sm text-zinc-500">Complete</span>
                    </div>
                    <div className="w-full bg-zinc-700/30 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-[#FFBE18] to-amber-400 h-2 rounded-full transition-all duration-500" 
                        style={{ width: '33%' }}
                      ></div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  {/* Card Details */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-zinc-300 mb-1">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium text-zinc-300 mb-1">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            id="expiry"
                            name="expiry"
                            required
                            value={formData.expiry}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label htmlFor="cvc" className="block text-sm font-medium text-zinc-300 mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            id="cvc"
                            name="cvc"
                            required
                            value={formData.cvc}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Billing Address */}
                  <div className="col-span-2 mt-4">
                    <h3 className="text-lg font-medium mb-4">Billing Address</h3>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-zinc-300 mb-1">
                          Street Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          required
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                          placeholder="123 Main St"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label htmlFor="city" className="block text-sm font-medium text-zinc-300 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            required
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                            placeholder="New York"
                          />
                        </div>
                        <div>
                          <label htmlFor="state" className="block text-sm font-medium text-zinc-300 mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            required
                            value={formData.state}
                            onChange={handleInputChange}
                            className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                            placeholder="NY"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="zip" className="block text-sm font-medium text-zinc-300 mb-1">
                          ZIP / Postal Code
                        </label>
                        <input
                          type="text"
                          id="zip"
                          name="zip"
                          required
                          value={formData.zip}
                          onChange={handleInputChange}
                          className="w-full bg-zinc-800/30 border border-zinc-700 rounded-xl px-5 py-3.5 focus:ring-2 focus:ring-[#FFBE18] focus:border-transparent outline-none transition-all duration-200 hover:border-zinc-500/50 placeholder-zinc-500"
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex items-center">
                    <input
                      type="checkbox"
                      id="saveInfo"
                      name="saveInfo"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-zinc-600 bg-zinc-700/50 text-[#FFBE18] focus:ring-[#FFBE18]"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-sm text-zinc-300">
                      Save my information for future purchases
                    </label>
                  </div>
                  <div className="col-span-2">
                    <motion.div 
                      className="mt-8"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-[#FFBE18] to-amber-400 text-black font-semibold py-4 px-6 rounded-xl hover:shadow-lg hover:shadow-[#FFBE18]/20 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                      {isProcessing ? (
                        <>
                          <svg className="animate-spin h-5 w-5 mr-3 text-black" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        'Complete Order'
                      )}
                      </button>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        <p className="text-xs text-zinc-400">
                          Secured with 256-bit SSL encryption
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </form>
              <p className="mt-6 text-center text-sm text-zinc-500">
                By placing your order, you agree to our{' '}
                <a href="/terms" className="text-[#FFBE18] hover:underline">Terms of Service</a> and{' '}
                <a href="/privacy" className="text-[#FFBE18] hover:underline">Privacy Policy</a>
              </p>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 sticky top-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div className="flex items-start">
                      <div className="relative w-16 h-16 bg-zinc-700 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                        {item.imageUrl && (
                          <Image 
                            src={item.imageUrl} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                            width={64}
                            height={64}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.onerror = null;
                              target.src = 'https://via.placeholder.com/80/1a1a1a/cccccc?text=No+Image';
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-zinc-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-medium">{item.price}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-zinc-700 pt-4 space-y-3">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-zinc-700 mt-2">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6 bg-zinc-700/30 p-4 rounded-lg">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div>
                    <p className="text-sm text-zinc-300">Secure Checkout</p>
                    <p className="text-xs text-zinc-500">All transactions are encrypted and secure</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex items-center text-sm text-zinc-400">
                <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Instant access after purchase</span>
              </div>
            </motion.div>
            
            <div className="mt-6 text-center">
              <Link 
                href="/marketplace" 
                className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center justify-center"
              >
                <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}