import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import type React from "react"; // Import React
import { cn } from "@/lib/utils";
import BackToTopButton from "@/components/BackToTopButton";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/app/(site)/Navbar";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ShipFirst - Premium SaaS Boilerplate",
  description:
    "Launch your SaaS faster with ShipFirst, a premium Next.js boilerplate. Get all the features you need to build and scale your startup.",
  keywords: [
    "saas",
    "boilerplate",
    "premium",
    "paid",
    "nextjs",
    "startup",
    "shipfirst",
    "drew",
    "made by drew",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(bricolageGrotesque.className, "antialiased")}>
        <CartProvider>
          <Header />
          {children}
          <BackToTopButton />
        </CartProvider>
      </body>
    </html>
  );
}
