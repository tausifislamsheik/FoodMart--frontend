import { Button } from "@/components/ui/button";
import { providerService } from "@/services/provider.service";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "../ui/card";

interface Provider {
  id: string;
  restaurantName: string;
  address: string;
  logo?: string | null;
  orders?: any[];
}

export default async function PopularMealsProviderSection() {
  const providersRes = await providerService.getAllProviders();
  const providers: Provider[] = providersRes.data || [];

  // sort by order count
  const sortedProviders = [...providers].sort(
    (a, b) => (b.orders?.length || 0) - (a.orders?.length || 0),
  );

  return (
    <section className="max-w-400 mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Providers</h2>
        <Link href="/providers">
          <Button
            variant="default"
            className="inline-flex items-center gap-2 px-8 py-4 text-orange-500-foreground font-semibold rounded-sm hover:bg-text-orange-500 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-6xl hover:shadow-orange-100 hover:-translate-y-0.5 bg-orange-500 text-white cursor-pointer outline"
          >
            See All Providers
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
          </Button>
        </Link>
      </div>

      {/* Providers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProviders.slice(0, 4).map((provider) => (
          <Card
            key={provider.id}
            className="hover:shadow-lg transition border pt-0"
          >
            <CardHeader className="p-0">
              <div className="relative h-40 w-full bg-muted">
                <Image
                  src={provider.logo || "./globe.svg"}
                  alt={provider.restaurantName}
                  fill
                  className="object-contain p-4"
                />
              </div>
            </CardHeader>

            <CardContent className="p-4 space-y-1">
              <h3 className="text-lg font-semibold">
                {provider.restaurantName}
              </h3>

              <p className="text-sm text-muted-foreground">
                {provider.address}
              </p>

              <p className="text-sm mt-2">
                Orders:{" "}
                <span className="font-semibold text-orange-600">
                  {provider.orders?.length || 0}
                </span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
