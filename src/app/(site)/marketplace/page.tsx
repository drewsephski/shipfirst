'use client';

import { useState, useMemo, useEffect } from "react";
import dynamic from 'next/dynamic';
import BoilerplateFilter from "./BoilerplateFilter";
import Navbar from "@/app/(site)/Navbar";
import Footer from "@/app/(site)/Footer";
import Cta from "@/app/(site)/Cta";
import BoilerplateCard from "./BoilerplateCard";
import Faq from "@/app/(site)/Faq";
import FeaturedTime from "@/app/(site)/FeaturedTime";
import Hero from "@/app/(site)/Hero";
import MakerIntro from "@/app/(site)/MakerIntro";
import PricingSection from "@/app/(site)/pricing";
import TestimonialsPage from "@/app/(site)/Testimonials";
import { CartProvider } from "@/contexts/CartContext";
import { Boilerplate } from "@/types/boilerplate";
import { Input } from "@/components/ui/input";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { Button } from "@/components/ui/button";

// Dynamically import the Cart component with SSR disabled
const Cart = dynamic(() => import('@/components/Cart'), {
  ssr: false,
  loading: () => (
    <div className="fixed right-4 bottom-4 z-50">
      <button className="bg-[#FFBE18] text-black p-3 rounded-full shadow-lg hover:shadow-xl transition-all">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m-10 0h10m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </button>
    </div>
  ),
});

import boilerplatesData from "../../../../boilerplates.json";

// Add IDs to boilerplates if they don't have them
const ALL_BOILERPLATES: Boilerplate[] = boilerplatesData.map((bp: any, index) => ({
  ...bp,
  id: bp.id || `bp-${index}`,
  priceId: bp.priceId || `price_${Date.now()}_${index}`,
  price: bp.price || "$0.00",
  features: bp.features || [
    'Responsive Design',
    'Modern UI/UX',
    'Easy Customization',
    'Well Documented',
  ],
  category: bp.category || "Template"
}));

// New component for skeleton
const BoilerplateCardSkeleton = () => (
  <div className="bg-zinc-900 border border-zinc-700 text-white overflow-hidden relative h-full flex flex-col rounded-lg animate-pulse">
    <div className="w-full h-48 bg-zinc-800"></div>
    <div className="p-6 flex-1 flex flex-col">
      <div className="mb-4">
        <div className="flex justify-between items-start mb-2">
          <div className="h-6 bg-zinc-800 rounded w-3/4"></div>
          <div className="h-6 bg-zinc-800 rounded w-1/4"></div>
        </div>
        <div className="h-4 bg-zinc-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
      </div>
      <div className="mt-auto pt-4 border-t border-zinc-800">
        <div className="h-10 bg-zinc-800 rounded w-full"></div>
      </div>
    </div>
  </div>
);

function MarketplaceContent() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('name-asc');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [filter, searchTerm, sortOption, currentPage]);

  const sortedAndFilteredBoilerplates = useMemo(() => {
    let currentBoilerplates = ALL_BOILERPLATES;

    // Apply category filter
    if (filter !== 'all') {
      const categorySearchTerm = filter === 'next' ? 'next' :
                                 filter === 'saas' ? 'saas' :
                                 filter === 'fullstack' ? 'full-stack' :
                                 filter === 'starter' ? 'starter' :
                                 filter === 'ai' ? 'ai' : '';
      currentBoilerplates = currentBoilerplates.filter(bp =>
        bp.category?.toLowerCase().includes(categorySearchTerm)
      );
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentBoilerplates = currentBoilerplates.filter(bp =>
        bp.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        bp.description.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    // Apply sorting
    currentBoilerplates.sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
        case 'price-desc':
          return parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', ''));
        default:
          return 0;
      }
    });

    return currentBoilerplates;
  }, [filter, searchTerm, sortOption]);

  const paginatedBoilerplates = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedAndFilteredBoilerplates.slice(startIndex, endIndex);
  }, [currentPage, itemsPerPage, sortedAndFilteredBoilerplates]);

  const totalPages = Math.ceil(sortedAndFilteredBoilerplates.length / itemsPerPage);
  const SKELETON_COUNT = 9;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const SORT_OPTIONS = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
  ];

  return (
    <div className="bg-[#212121]">
      <Navbar />
      <Hero />
      <div className="min-h-screen bg-[#212121] text-white py-12 px-4 pt-16 relative overflow-hidden">
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#212121] via-[#1a1a1a] to-[#212121] opacity-80"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mt-12 mb-6">
            SaaS Boilerplate Marketplace
          </h1>
          
          <div className="mb-8 flex justify-center">
            <Input
              type="text"
              placeholder="Search boilerplates..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              className="w-full max-w-md bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:border-[#FFBE18]"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <BoilerplateFilter onFilterChange={(value) => {
              setFilter(value);
              setCurrentPage(1); // Reset page on filter change
            }} />
            <CustomDropdown
              options={SORT_OPTIONS}
              value={sortOption}
              onChange={(value) => {
                setSortOption(value);
                setCurrentPage(1); // Reset page on sort change
              }}
              className="w-64"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <BoilerplateCardSkeleton key={i} />
              ))
            ) : paginatedBoilerplates.length > 0 ? (
              paginatedBoilerplates.map((bp, index) => (
                <BoilerplateCard key={index} bp={bp} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-xl text-zinc-400">No boilerplates found matching your criteria.</p>
              </div>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#FFBE18] hover:text-[#FFBE18]"
              >
                Previous
              </Button>
              <span className="text-white">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="border-zinc-700 text-white hover:bg-zinc-800 hover:border-[#FFBE18] hover:text-[#FFBE18]"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
      <FeaturedTime />
      <MakerIntro />
      <PricingSection />
      <Faq />
      <TestimonialsPage />
      <Cta />
      <Footer />
      <Cart />
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <CartProvider>
      <MarketplaceContent />
    </CartProvider>
  );
}
