import CheckoutButton from "@/components/CheckoutButton";
import SEO from "@/utils/seo";

const plans = [
  {
    name: "Pro",
    price: "$5/month",
    features: ["Feature 1", "Feature 2", "Feature 3"],
    priceId: "YOUR_STRIPE_PRICE_ID",

  },
];

export default function PricingPage() {
  return (
    <>
      <SEO
        title="ShipFirst - Premium SaaS Boilerplate"
        description="Purchase the ShipFirst premium SaaS boilerplate to launch your startup faster."
        canonicalUrl="https://yourdomain.com"
        ogImageUrl="https://yourdomain.com/og-image.png"
        twitterHandle="yourtwitterhandle"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Purchase Your ShipFirst Template
        </h1>
        <div className="flex justify-center">
          {plans.map((plan) => (
            <div key={plan.name} className="border rounded-lg p-6 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">{plan.name}</h2>
              <p className="text-xl mb-4">{plan.price}</p>
              <ul className="mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="mb-2">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <CheckoutButton priceId={plan.priceId} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
