import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { mealService } from "@/services/meal.service";
import Link from "next/link";

interface MealData {
  id: string;
  name: string;
  image?: string | null;
  price: number;
  createdAt?: string;
}

export default async function RecentMeals() {
  const mealsRes = await mealService.getAllMeals();
  const meals: MealData[] = mealsRes.data || [];

  // Sort by createdAt descending and take 4
  const recentMeals = meals
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 4);

  return (
    <div className="max-w-400 mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Recent Meals</h2>
        <Link href="/meals">
          <Button>See All Meals</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentMeals.map((meal) => (
          <Card
            key={meal.id}
            className="cursor-pointer hover:shadow-lg transition-shadow pt-0"
          >
            {meal.image && (
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-48 object-cover rounded-t-xl"
              />
            )}
            <CardContent>
              <CardTitle className="text-lg font-semibold">
                {meal.name}
              </CardTitle>
              <p className="text-gray-600">৳{meal.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}