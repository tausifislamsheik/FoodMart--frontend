"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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

interface MealSliderProps {
  title: string;
  meals: Meal[];
}

const ITEMS_PER_SLIDE = 4;

const MealSlider = ({ title, meals }: MealSliderProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + ITEMS_PER_SLIDE;
  const totalSlides = Math.ceil(meals.length / ITEMS_PER_SLIDE);

  const prev = () =>
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_SLIDE, 0));
  const next = () =>
    setStartIndex((prev) =>
      Math.min(prev + ITEMS_PER_SLIDE, (totalSlides - 1) * ITEMS_PER_SLIDE),
    );

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex flex-col md:flex-row md:items-center gap-3">
        {/* Left Button (Desktop) */}
        <Button
          size="sm"
          onClick={prev}
          disabled={startIndex === 0}
          className="hidden md:block cursor-pointer"
        >
          {"<"}
        </Button>

        {/* Slider Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
          {meals.slice(startIndex, endIndex).map((meal) => (
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
              <CardContent>
                <p className="text-sm line-clamp-2">{meal.description}</p>
                <p className="font-semibold text-orange-600">৳ {meal.price}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" disabled={!meal.isAvailable}>
                  <Link href={`/meals/${meal.id}`}>Order Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Right Button (Desktop) */}
        <Button
          size="sm"
          onClick={next}
          disabled={startIndex + ITEMS_PER_SLIDE >= meals.length}
          className="hidden md:block cursor-pointer"
        >
          {">"}
        </Button>

        {/* Mobile Navigation Buttons */}
        <div className="flex justify-center gap-4 md:hidden">
          <Button
            size="sm"
            onClick={prev}
            disabled={startIndex === 0}
            className="cursor-pointer"
          >
            {"<"}
          </Button>
          <Button
            size="sm"
            onClick={next}
            disabled={startIndex + ITEMS_PER_SLIDE >= meals.length}
            className="cursor-pointer"
          >
            {">"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealSlider;