"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cartService } from "@/services/cart.service";
import Image from "next/image";
import { toast } from "sonner";

interface Category {
  id: string;
  name: string;
}

interface Provider {
  restaurantName: string;
}

interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  isAvailable: boolean;
  category: Category;
  provider: Provider;
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: string;
  updatedAt: string;
  role: "CUSTOMER" | "ADMIN" | "PROVIDER";
  status: "ACTIVE" | "INACTIVE" | string;
}

const ITEMS_PER_PAGE = 9;

const MealsClient = ({ meals, user }: { meals: Meal[]; user: User | null }) => {
  const [category, setCategory] = useState("all");
  const [priceSort, setPriceSort] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [page, setPage] = useState(1);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const categories = useMemo(
    () => Array.from(new Set(meals.map((m) => m.category.name))),
    [meals],
  );

  const filteredMeals = useMemo(() => {
    let data = [...meals];

    if (category !== "all") {
      data = data.filter((m) => m.category.name === category);
    }

    if (availability !== "all") {
      data = data.filter((m) =>
        availability === "available" ? m.isAvailable : !m.isAvailable,
      );
    }

    if (priceSort === "low") data.sort((a, b) => a.price - b.price);
    if (priceSort === "high") data.sort((a, b) => b.price - a.price);

    return data;
  }, [meals, category, priceSort, availability]);

  const totalPages = Math.ceil(filteredMeals.length / ITEMS_PER_PAGE);

  const paginatedMeals = filteredMeals.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Category</span>
          <Select onValueChange={setCategory} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Price</span>
          <Select onValueChange={setPriceSort} defaultValue="default">
            <SelectTrigger>
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="low">Low to High</SelectItem>
              <SelectItem value="high">High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium mb-1">Availability</span>
          <Select onValueChange={setAvailability} defaultValue="all">
            <SelectTrigger>
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="available">Available</SelectItem>
              <SelectItem value="unavailable">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMeals.map((meal) => (
          <Card key={meal.id} className="flex flex-col overflow-hidden pt-0">
            <div className="relative w-full aspect-video overflow-hidden">
              <Image
                src={meal.image || "/placeholder-meal.jpg"}
                alt={meal.name}
                fill
                className="block object-cover transition-transform duration-300 ease-out hover:scale-110"
                unoptimized
              />
            </div>

            <CardHeader>
              <CardTitle className="text-lg">{meal.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {meal.provider.restaurantName}
              </p>
            </CardHeader>

            <CardContent className="space-y-2">
              <p className="text-sm line-clamp-3">{meal.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-orange-600">
                  ৳ {meal.price}
                </span>
                <Badge variant={meal.isAvailable ? "default" : "destructive"}>
                  {meal.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="mt-auto flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setQuantities((q) => ({
                      ...q,
                      [meal.id]: Math.max(1, (q[meal.id] || 1) - 1),
                    }))
                  }
                >
                  -
                </Button>

                <span className="min-w-6 text-center">
                  {quantities[meal.id] || 1}
                </span>

                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    setQuantities((q) => ({
                      ...q,
                      [meal.id]: (q[meal.id] || 1) + 1,
                    }))
                  }
                >
                  +
                </Button>
              </div>

              <Button
                className="w-full gap-2 bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
                disabled={!meal.isAvailable || addingId === meal.id}
                onClick={async () => {
                  if (!user) {
                    toast.error("Please login to add items to cart");
                    return;
                  }

                  try {
                    setAddingId(meal.id);

                    const quantity = quantities[meal.id] || 1;

                    const res = await cartService.addToCart({
                      mealId: meal.id,
                      quantity,
                    });

                    if (res.success) {
                      toast.success("Added to cart");
                    } else {
                      toast.error(res.message || "Failed to add to cart");
                    }
                  } catch (error) {
                    toast.error("Something went wrong");
                  } finally {
                    setAddingId(null);
                  }
                }}
              >
                {addingId === meal.id ? "Adding..." : "Add to Cart"}
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href={`/meals/${meal.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(1)}
            disabled={page === 1}
            className="cursor-pointer"
          >
            <ChevronsLeft size={18} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="cursor-pointer"
          >
            <ChevronLeft size={18} />
          </Button>

          <span className="px-4 text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="cursor-pointer"
          >
            <ChevronRight size={18} />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages}
            className="cursor-pointer"
          >
            <ChevronsRight size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default MealsClient;