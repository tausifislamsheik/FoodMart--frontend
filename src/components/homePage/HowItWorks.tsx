import { ClipboardList, Smile, Truck } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: ClipboardList,
    title: "Choose Your Favorite",
    description:
      "Browse our wide variety of delicious meals and pick exactly what you love. You can order online or call us to customize your order according to your taste and preferences. It's fast, easy, and convenient!",
    step: 1,
  },
  {
    icon: Truck,
    title: "We Deliver Your Meals",
    description:
      "Once your order is placed, our professional delivery team ensures your meals are freshly prepared and delivered straight to your doorstep. Enjoy hot and delicious food without leaving the comfort of your home.",
    step: 2,
  },
  {
    icon: Smile,
    title: "Eat and Enjoy",
    description:
      "Relax and enjoy your meals with your family or friends. No shopping, no cooking, no counting, and no cleaning required. Experience the joy of healthy, hassle-free dining at home with FoodHub.",
    step: 3,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-orange-50 text-orange-500 text-sm font-medium rounded-full mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            How It <span className="text-orange-500">Works</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg">
            Getting your favorite meals delivered has never been easier
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-18 relative">
          {/* Connection Line - Desktop Only */}
          <div className="hidden md:block absolute top-24 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

          {steps.map((step, index) => (
            <div
              key={step.step}
              className="group relative"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-card rounded-2xl p-8 shadow-lg border border-border/50 hover:shadow-xl hover:border-orange-200 transition-all duration-300 hover:-translate-y-1 h-full">
                {/* Step Number */}
                <div className="absolute -top-4 left-8">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-full text-orange-500-foreground text-sm font-bold shadow-lg shadow-primary/30 bg-orange-500 text-white">
                    {step.step}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-6 pt-4">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-orange-100 transition-colors duration-300">
                    <step.icon
                      className="w-8 h-8 text-orange-500"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link href={"/meals"}>
            <button className="inline-flex items-center gap-2 px-8 py-4 text-orange-500-foreground font-semibold rounded-full hover:bg-text-orange-500 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-6xl hover:shadow-orange-100 hover:-translate-y-0.5 bg-orange-500 text-white cursor-pointer">
              Get Started Today
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
