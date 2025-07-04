'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Trash2, ArrowRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link'; // This line is already present and correct.

export default function Cart() {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    cartCount, 
    cartTotal,
    clearCart 
  } = useCart();
  
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Ensure component is mounted on client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Prevent body scroll when cart is open
  useEffect(() => {
    if (isClient) {
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [isOpen, isClient]);

  // Close cart when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.cart-container') && !target.closest('.cart-button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const cartVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', damping: 30, stiffness: 300 }
    },
    exit: { 
      x: '100%',
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }),
    exit: { opacity: 0, y: 20 }
  };

  if (!isClient) return null;

  return (
    <>
      {/* Cart Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed right-4 bottom-4 z-50 cart-button"
        aria-label="Open cart"
      >
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-[#FFBE18] flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
            <ShoppingCart className="w-6 h-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={backdropVariants}
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div 
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#1a1a1a] shadow-2xl z-50 flex flex-col cart-container"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={cartVariants}
            >
              {/* Cart Header */}
              <div className="p-4 border-b border-zinc-800 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Your Cart
                  {cartCount > 0 && (
                    <span className="text-sm bg-[#FFBE18] text-black px-2 py-0.5 rounded-full">
                      {cartCount} {cartCount === 1 ? 'item' : 'items'}
                    </span>
                  )}
                </h2>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-zinc-800 transition-colors"
                  aria-label="Close cart"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-8 text-zinc-400">
                    <ShoppingCart className="w-12 h-12 mb-4 text-zinc-600" />
                    <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                    <p className="text-sm mb-6">Browse our boilerplates and find something you like</p>
                    <Button 
                      onClick={() => setIsOpen(false)}
                      className="bg-[#FFBE18] hover:bg-[#FFBE18]/90 text-black font-medium"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={itemVariants}
                        className="bg-zinc-900/50 rounded-lg p-4 border border-zinc-800 flex gap-4"
                      >
                        <div className="w-20 h-20 bg-zinc-800 rounded-md overflow-hidden flex-shrink-0">
                          {item.imageUrl && (
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.onerror = null;
                                target.src = 'https://via.placeholder.com/80/1a1a1a/cccccc?text=No+Image';
                              }}
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-white truncate">{item.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-500 hover:text-red-500 transition-colors ml-2"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-zinc-400 mb-2 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between mt-auto">
                            <div className="flex items-center border border-zinc-700 rounded-md overflow-hidden">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-3 py-1 text-sm font-medium text-white">
                                {item.quantity}
                              </span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                            <span className="font-bold text-[#FFBE18]">
                              ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Cart Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-zinc-800 p-4 bg-[#1a1a1a]/80 backdrop-blur-sm">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white">Subtotal</span>
                    <span className="text-xl font-bold">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button 
                      asChild
                      className="bg-[#FFBE18] hover:bg-[#FFBE18]/90 text-black font-bold py-2 h-auto"
                    >
                      <Link href="/checkout" onClick={() => setIsOpen(false)}>
                        Proceed to Checkout
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-600"
                      onClick={() => {
                        if (confirm('Are you sure you want to clear your cart?')) {
                          clearCart();
                        }
                      }}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
