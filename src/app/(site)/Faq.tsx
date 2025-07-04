"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is the SaaS Boilerplate Marketplace?",
    answer:
      "The SaaS Boilerplate Marketplace offers a curated selection of high-quality, pre-built SaaS templates and boilerplates to help you launch your startup faster.",
  },
  {
    question: "How do I purchase a boilerplate?",
    answer:
      "Simply browse our marketplace, select the boilerplate that fits your needs, and proceed to checkout. You'll receive instant access upon purchase.",
  },
  {
    question: "What technologies are used in the boilerplates?",
    answer:
      "Our boilerplates are built with modern and popular technologies like Next.js, React, Node.js, Stripe, Lemon Squeezy, and various database integrations (e.g., MongoDB, Supabase).",
  },
  {
    question: "Can I customize the purchased boilerplate?",
    answer:
      "Absolutely! All boilerplates are designed to be fully customizable. You'll receive the complete source code to modify as per your project requirements.",
  },
  {
    question: "Do the boilerplates include payment integrations?",
    answer:
      "Yes, most of our boilerplates come pre-integrated with popular payment gateways like Stripe and Lemon Squeezy for easy subscription and one-time payment handling.",
  },
  {
    question: "Is there support available after purchase?",
    answer:
      "Yes, each boilerplate typically comes with documentation and access to community support or direct support from the boilerplate creator.",
  },
  {
    question: "Are there updates for the boilerplates?",
    answer:
      "Many boilerplate creators provide regular updates to ensure compatibility with the latest technologies and to add new features. Check individual product descriptions for details.",
  },
  {
    question: "Can I sell my own boilerplate on the marketplace?",
    answer:
      "We are always looking for high-quality boilerplates to add to our marketplace. Please contact us to discuss partnership opportunities.",
  },
  {
    question: "What if I encounter a bug or issue?",
    answer:
      "For technical issues, please refer to the boilerplate's documentation or contact the creator directly. For marketplace-related issues, please reach out to our support team.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faq"
      className="min-h-screen bg-[#0F0F0F] px-4 py-12 md:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-4xl font-medium text-white">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-center text-base text-zinc-500">
          Have another question? Contact us by{" "}
          <a
            href="mailto:drewsepeczi@gmail.com"
            target="_blank"
            className="text-zinc-200 hover:text-white underline"
          >
            email
          </a>
          .
        </p>

        <div className="space-y-[2px]">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between bg-zinc-900/50 px-6 py-4 text-left transition-colors hover:bg-zinc-900"
              >
                <span className="text-[16px] font-medium text-white">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700">
                  <PlusIcon
                    className={`h-3 w-3 text-white transition-transform duration-200 ${openIndex === index ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-zinc-900/30 px-6 py-4 text-base text-zinc-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
