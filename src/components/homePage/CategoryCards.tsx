import { Button } from "@/components/ui/button";
import { CategoryData, categoryService } from "@/services/category.service";
import { MealData, mealService } from "@/services/meal.service";
import Link from "next/link";

const colors = [
  "bg-red-500/20 text-red-600",
  "bg-blue-500/20 text-blue-600",
  "bg-green-500/20 text-green-600",
  "bg-yellow-500/20 text-yellow-600",
  "bg-purple-500/20 text-purple-600",
];

interface CategoryWithCount extends CategoryData {
  mealCount: number;
}

const CategorySection = async () => {
  const { data: categories, error: catError } =
    await categoryService.getAllCategories();
  if (catError || !categories || categories.length === 0) {
    return (
      <div className="justify-center items-center text-center">
        <p className="text-center text-gray-500 text-2xl font-semibold border-2 inline mx-auto p-7 rounded-2xl">
          No Categories Found
        </p>
      </div>
    );
  }

  const { data: meals, error: mealError } = await mealService.getAllMeals();
  if (mealError || !meals) {
    return <p className="text-center">No meals found.</p>;
  }

  const categoryMealCount: Record<string, number> = {};
  (meals as MealData[]).forEach((meal: MealData) => {
    if (meal.categoryId) {
      categoryMealCount[meal.categoryId] =
        (categoryMealCount[meal.categoryId] || 0) + 1;
    }
  });

  const sortedCategories: CategoryWithCount[] = (categories as CategoryData[])
    .map((cat: CategoryData) => ({
      ...cat,
      mealCount: categoryMealCount[cat.id!] || 0,
    }))
    .sort(
      (a: CategoryWithCount, b: CategoryWithCount) => b.mealCount - a.mealCount,
    )
    .slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Popular <span className="text-orange-500">Categories</span>
      </h2>

      <div className="flex justify-end my-10">
        <Link href="/meals" passHref>
          <Button
            size="sm"
            className="inline-flex items-center gap-2 px-8 py-5 text-orange-500-foreground font-semibold rounded-sm hover:bg-text-orange-500 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-6xl hover:shadow-orange-100 hover:-translate-y-0.5 bg-orange-500 text-white cursor-pointer outline"
          >
            See All Category Meals
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {sortedCategories.map((cat: CategoryWithCount, idx: number) => {
          const color = colors[idx % colors.length];

          return (
            <div
              key={cat.id}
              className="flex flex-col items-center bg-white rounded-xl shadow-md p-6 space-y-4 hover:scale-105 transition-transform duration-200"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${color}`}
              >
                {cat.name
                  .split(" ")
                  .map((word: string) => word[0])
                  .join("")}
              </div>

              <h3 className="font-semibold text-lg text-center">{cat.name}</h3>
              <p className="text-sm text-gray-500">
                {cat.mealCount} meal{cat.mealCount !== 1 ? "s" : ""}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySection;
