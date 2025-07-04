"use client";

import CheckoutButton from "@/components/CheckoutButton";
import { Check } from "lucide-react";
import type React from "react";
export default function PricingSection() {
  return (
    <div
      id="pricing"
      className="min-h-screen bg-[#0F0F0F] text-white px-4 py-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#FFBE18] font-medium mb-4">Pricing</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Save hours of repetitive code,
            <br />
            ship fast, get profitable!
          </h2>
        </div>

        <div className="max-w-md mx-auto">
          <div className="rounded-xl bg-zinc-900 p-6 border border-green-500/50 relative">
            <div className="absolute -top-3 right-6 bg-green-500 text-black text-sm font-semibold px-3 py-1 rounded-full">
              Paid
            </div>
            <h3 className="text-xl font-semibold mb-4">Pro Edition</h3>
            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">$5</span>
                <span className="text-zinc-500">/ month</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <Feature>NextJS boilerplate</Feature>
              <Feature>SEO & Blog</Feature>
              <Feature>Mailgun emails</Feature>
              <Feature>Stripe / Lemon Squeezy</Feature>
              <Feature>MongoDB / Supabase</Feature>
              <Feature>Google OAuth & Magic Links</Feature>
              <Feature>Components & animations</Feature>
              <Feature>ChatGPT prompts for terms & privacy</Feature>
              <Feature>Discord community access</Feature>
              <Feature>Regular updates</Feature>
            </div>

            <CheckoutButton priceId="YOUR_STRIPE_PRICE_ID" />
            <p className="text-center text-zinc-500 text-sm mt-4">
              Get started today and launch your SaaS faster!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
      <span className="text-zinc-300">{children}</span>
    </div>
  );
}
