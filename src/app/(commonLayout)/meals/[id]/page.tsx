import MealSlider from "@/components/mealsPage/MealSlider";
import OrderButton from "@/components/mealsPage/OrderButton";
import ReviewSection from "@/components/mealsPage/ReviewSection";
import { adminService } from "@/services/admin.service";
import { mealService } from "@/services/meal.service";
import { userService } from "@/services/user.service";
import Image from "next/image";

const MealsDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const mealRes = await mealService.getMealById(id);
  const meal = mealRes.data;

  const userInfo = await adminService.getUserById(meal?.userId);

  const loggedInUserData = await userService.getSession();
  const user = loggedInUserData.data?.user!;

  if (!meal)
    return (
      <div className="mt-10 flex justify-center items-center">
        Meal not found
      </div>
    );

  const allMealsRes = await mealService.getAllMeals();
  const allMeals = allMealsRes.data ?? [];

  const sameCategory = allMeals.filter(
    (m: any) =>
      m.category.id === meal.category.id && m.id !== meal.id && m.isAvailable,
  );

  const otherCategory = allMeals.filter(
    (m: any) => m.category.id !== meal.category.id && m.isAvailable,
  );

  return (
    <div className="space-y-10 container mx-auto px-4 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={meal.image || "/placeholder-meal.jpg"}
            alt={meal.name}
            fill
            className="object-cover transition-transform duration-300 ease-out hover:scale-105"
            unoptimized
          />
        </div>

        <div className="flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900">{meal.name}</h1>
          <p className="text-2xl font-semibold text-orange-600">
            ৳ {meal.price}
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            {meal.description}
          </p>

          <div className="mt-2 p-5 bg-gray-50 rounded-2xl shadow-inner space-y-3">
            <h2 className="text-xl font-bold text-gray-800">Provider Info</h2>

            <div className="flex items-center gap-4">
              {userInfo.data?.image ? (
                <Image
                  src={userInfo.data.image}
                  alt={userInfo.data.name}
                  width={50}
                  height={50}
                  className="rounded-full object-cover border border-gray-300"
                  unoptimized
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                  {userInfo.data?.name?.charAt(0) || "P"}
                </div>
              )}
              <div className="flex flex-col">
                <p className="font-semibold text-gray-900">
                  {userInfo.data?.name || "N/A"}
                </p>
                <p className="text-sm text-gray-500">
                  {userInfo.data?.email || "No Email"}
                </p>
              </div>
            </div>

            <p className="text-gray-600">
              Company:{" "}
              <span className="font-semibold">
                {meal.provider.restaurantName}
              </span>
            </p>
            <p className="text-gray-600">
              Address:{" "}
              <span className="font-semibold">{meal.provider.address}</span>
            </p>
            <p className="text-gray-600">
              Joined:{" "}
              <span className="font-semibold">
                {userInfo.data
                  ? new Date(
                      (userInfo.data as any).createdAt,
                    ).toLocaleDateString()
                  : "N/A"}
              </span>
            </p>
            <p className="text-gray-600">
              Delivery:{" "}
              <span className="font-semibold">Cash on delivery available</span>
            </p>
          </div>

          {meal?.isAvailable ? (
            user?.role === "CUSTOMER" ? (
              <OrderButton
                mealId={meal.id}
                mealName={meal.name}
                mealPrice={meal.price}
                providerId={meal.providerId}
                customerId={user.id}
              />
            ) : (
              <p className="mt-4 text-center text-red-600 font-medium">
                Only signed-in customers can place an order
              </p>
            )
          ) : (
            <button
              disabled
              className="mt-4 w-full py-3 text-lg font-medium bg-gray-400 text-white rounded-xl cursor-not-allowed"
            >
              Not Available
            </button>
          )}
        </div>
      </div>

      <ReviewSection
        mealId={meal?.id}
        userInfo={userInfo?.data}
        loggedInUser={user || null}
      />

      {sameCategory.length > 0 && (
        <MealSlider title="More from this category" meals={sameCategory} />
      )}

      {otherCategory.length > 0 && (
        <MealSlider
          title="Other categories you might like"
          meals={otherCategory}
        />
      )}
    </div>
  );
};

export default MealsDetails;