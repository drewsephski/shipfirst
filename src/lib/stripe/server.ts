import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2025-01-27.acacia",
  appInfo: {
    name: "shipfirst",
    url: "https://shipfirst.dev",
  },
});