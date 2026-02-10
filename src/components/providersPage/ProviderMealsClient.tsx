"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Pagination from "./Pagination";


interface ProviderMealsClientProps {
  meals: any[];
}

export default function ProviderMealsClient({
  meals,
}: ProviderMealsClientProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const perPage = 6;

  const totalPages = Math.ceil(meals.length / perPage);

  const paginatedMeals = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return meals.slice(start, start + perPage);
  }, [currentPage, meals]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Meals</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedMeals.length > 0 ? (
          paginatedMeals.map((meal: any) => (
            <Card key={meal.id} className="flex flex-col space-y-2 pt-0">
              {meal.image ? (
                <div className="w-full h-40 md:h-56 xl:h-72 relative rounded-lg overflow-hidden">
                  <Image
                    src={meal.image}
                    alt={meal.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500 font-bold text-xl">
                  {meal.name.charAt(0)}
                </div>
              )}
              <CardContent className="space-y-3">
                <CardTitle className="text-2xl font-bold">{meal.name}</CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  {meal.description}
                </CardDescription>
                <p className="font-semibold text-orange-600"><span className="text-xl mr-1">৳</span>{meal.price.toFixed(2)}</p>
                <Link href={`/meals/${meal.id}`}>
                  <Button className="w-full flex items-center justify-center space-x-2 cursor-pointer bg-orange-500 hover:bg-orange-600">
                    <ShoppingCart size={18} />
                    <span>View Details</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-2xl col-span-full text-center">
            No meals available.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}