import { X, ArrowRight, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const { cartItems, cartTotal } = useCart();
  
  const subtotal = cartTotal;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;
  
  const handleProceedToCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="flex min-h-full items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-zinc-800/95 backdrop-blur-lg rounded-2xl border border-zinc-700/50 shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-700/50">
              <h2 className="text-2xl font-bold text-white">Review Your Order</h2>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-zinc-700/50 text-zinc-400 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            {/* Content */}
            <div className="max-h-[60vh] overflow-y-auto p-6">
              {/* Order Items */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-20 h-20 bg-zinc-700/50 rounded-lg overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-700 flex items-center justify-center">
                          <svg className="w-6 h-6 text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-white truncate">{item.name}</h3>
                      <p className="text-sm text-zinc-400">${parseFloat(item.price.replace(/[^0-9.-]+/g, '')).toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">
                        ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="mt-8 pt-6 border-t border-zinc-700/50">
                <div className="space-y-3">
                  <div className="flex justify-between text-zinc-300">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-zinc-300">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold text-white pt-2 mt-2 border-t border-zinc-700/50">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              {/* Secure Checkout Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-zinc-400">
                <Shield className="h-4 w-4 text-green-400" />
                <span>Secure SSL encryption</span>
              </div>
            </div>
            
            {/* Footer */}
            <div className="p-6 bg-zinc-800/50 border-t border-zinc-700/50">
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 px-6 py-3.5 rounded-xl font-medium text-white bg-zinc-700 hover:bg-zinc-600 transition-colors"
                >
                  Back to Cart
                </button>
                <button
                  onClick={handleProceedToCheckout}
                  disabled={cartItems.length === 0}
                  className={`flex-1 px-6 py-3.5 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                    cartItems.length === 0
                      ? 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
                      : 'bg-[#FFBE18] hover:bg-[#FFBE18]/90 text-black transform hover:scale-[1.02] active:scale-95'
                  }`}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
              
              <div className="mt-4 text-center text-xs text-zinc-500">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
