"use client";

import { useState, useRef, MouseEvent } from "react";
import { useCart } from '@/contexts/CartContext';
import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { ShoppingCart, ExternalLink, Check, X, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface Boilerplate {
  id: string;
  name: string;
  description: string;
  price: string;
  priceId: string;
  imageUrl?: string;
  features?: string[];
  demoUrl?: string;
  quantity?: number; // Add quantity to Boilerplate interface
}

interface BoilerplateCardProps {
  bp: Boilerplate;
}

export default function BoilerplateCard({ bp }: BoilerplateCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { addToCart, cartItems } = useCart();
  const isInCart = cartItems.some(item => item.id === bp.id);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...bp, quantity });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Card
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="bg-zinc-900 border border-zinc-700 text-white overflow-hidden cursor-pointer relative
                     transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-[#FFBE18] group h-full flex flex-col
                     ring-1 ring-transparent group-hover:ring-[#FFBE18] group-hover:shadow-lg"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,190,24,0.1) 0%, rgba(15,15,15,0.1) 50%)`,
          }}
        >
          <CardHeader className="p-0">
            <div className="relative w-full h-48 overflow-hidden">
              {bp.imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={bp.imageUrl}
                    alt={`${bp.name} screenshot`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://via.placeholder.com/400x200/1a1a1a/cccccc?text=No+Image+Available';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <Button
                      variant="outline"
                      className="bg-[#FFBE18] text-black border-[#FFBE18] hover:bg-[#FFBE18]/90 hover:text-black mx-auto transform translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsModalOpen(true);
                      }}
                    >
                      <ExternalLink size={16} />
                      Quick View
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center text-zinc-500">
                  <span>No preview available</span>
                </div>
              )}
            </div>
          </CardHeader>
          <div className="p-6 flex-1 flex flex-col">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl font-bold text-white">{bp.name}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className="bg-[#FFBE18]/20 text-[#FFBE18] text-lg font-bold px-2.5 py-0.5 rounded-full">
                    {bp.price}
                  </span>
                </div>
              </div>
              <CardDescription className="text-zinc-400 line-clamp-2">
                {bp.description}
              </CardDescription>
            </div>
            
            <div className="mt-auto pt-4 border-t border-zinc-800">
              <Button
                className={`w-full ${isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-[#FFBE18] hover:bg-[#FFBE18]/90 text-black'} font-bold transition-all duration-300 relative overflow-hidden`}
                onClick={handleAddToCart}
                disabled={isAdded}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.span
                      key="added"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <Check size={18} />
                      Added to Cart
                    </motion.span>
                  ) : (
                    <motion.span
                      key="add"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={16} />
                      {isInCart ? 'Update Cart' : 'Add to Cart'}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>
        </Card>
      </DialogTrigger>
      
      <DialogContent className="bg-zinc-900 text-white border-zinc-700 max-w-4xl p-0 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* Left Column - Image */}
          <div className="relative h-80 md:h-full">
            <Image
              src={bp.imageUrl || 'https://via.placeholder.com/800x600/1a1a1a/cccccc?text=No+Image+Available'}
              alt={bp.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Right Column - Content */}
          <div className="p-6 md:p-8 flex flex-col">
            <DialogHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <DialogTitle className="text-2xl md:text-3xl font-bold text-white">
                    {bp.name}
                  </DialogTitle>
                  <p className="text-xl font-bold text-[#FFBE18] mt-2">
                    {bp.price}
                  </p>
                </div>
                <DialogClose className="text-zinc-400 hover:text-white transition-colors">
                  <X size={24} />
                </DialogClose>
              </div>
              
              <DialogDescription className="text-zinc-300 text-base">
                {bp.description}
              </DialogDescription>
            </DialogHeader>
            
            {/* Features */}
            {bp.features && bp.features.length > 0 && (
              <div className="my-6">
                <h4 className="text-lg font-semibold mb-3 text-white">Features</h4>
                <ul className="space-y-2">
                  {bp.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-4 h-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-zinc-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mt-auto pt-6 border-t border-zinc-800">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center border border-zinc-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={decrementQuantity}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 bg-zinc-900 text-white font-medium">
                    {quantity}
                  </span>
                  <button 
                    onClick={incrementQuantity}
                    className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-white transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <Button 
                  className={`flex-1 ${isInCart ? 'bg-green-600 hover:bg-green-700' : 'bg-[#FFBE18] hover:bg-[#FFBE18]/90 text-black'} font-bold`}
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={isAdded}
                >
                  {isAdded ? (
                    <span className="flex items-center gap-2">
                      <Check size={18} />
                      Added to Cart
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <ShoppingCart size={18} />
                      {isInCart ? 'Update Cart' : 'Add to Cart'}
                    </span>
                  )}
                </Button>
              </div>
              
              {bp.demoUrl && (
                <Button 
                  variant="outline" 
                  className="w-full mt-4 border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#FFBE18] hover:text-[#FFBE18]"
                  onClick={() => window.open(bp.demoUrl, '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Live Demo
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
