import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, UtensilsCrossed, Wallet } from "lucide-react";

const features = [
  {
    title: "Cash on Delivery",
    description:
      "Pay only when your food arrives at your doorstep. No online payment hassle, no stress.",
    icon: Wallet,
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Our providers prepare meals quickly and deliver them fresh, right on time.",
    icon: Truck,
  },
  {
    title: "Trusted Providers",
    description:
      "All restaurants and food providers are verified to ensure quality and hygiene.",
    icon: ShieldCheck,
  },
  {
    title: "Wide Meal Selection",
    description:
      "From local favorites to premium dishes — discover meals you’ll love.",
    icon: UtensilsCrossed,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-orange-500">FoodMart</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We make food ordering simple, secure, and convenient for everyone.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-600">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-semibold">{item.title}</h3>

                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}