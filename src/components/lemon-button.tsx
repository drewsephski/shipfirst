"use client";

import { createCheckout } from "@/utils/lemon";
import { useState } from "react";

interface LemonButtonProps {
  variantId: string;
}

export default function LemonButton({ variantId }: LemonButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/success`; // Redirect URL after successful payment
      const checkout = await createCheckout(variantId, redirectUrl);
      window.location.href = checkout.data.attributes.url;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
    >
      {isLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        "Buy Now"
      )}
    </button>
  );
}
