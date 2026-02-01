import ProviderMealsClient from "@/components/providersPage/ProviderMealsClient";
import { adminService } from "@/services/admin.service";
import { mealService } from "@/services/meal.service";
import { providerService } from "@/services/provider.service";
import { User } from "lucide-react";
import Image from "next/image";

const ProviderDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  // 1️⃣ Get provider info
  const providerRes = await providerService.getProviderById(id);
  if (!providerRes.data) return <p>Provider not found</p>;
  const provider = providerRes.data;

  // 2️⃣ Get user info for provider
  const userRes = await adminService.getUserById(provider.userId);
  const user = userRes.data;

  // 3️⃣ Get all meals for this provider
  const mealsRes = await mealService.getAllMeals();
  const meals =
    mealsRes.data?.filter((meal: any) => meal.providerId === provider.id) || [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Provider Profile */}
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* User Image */}
        <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg">
          {user?.image ? (
            <Image
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <User size={48} className="text-gray-400" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 space-y-3">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold">{provider.restaurantName}</h1>
            {/* Optional small provider logo badge */}
            {provider.logo && (
              <div className="w-12 h-12 relative rounded-lg overflow-hidden shadow">
                <Image
                  src={provider.logo}
                  alt="Provider Logo"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>

          {user && (
            <p className="text-gray-600 text-lg">
              <span className="font-semibold">Owner:</span> {user.name}
            </p>
          )}
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Address:</span> {provider.address}
          </p>
          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Phone:</span> {provider.phone}
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-gray-300" />

      {/* Meals Section */}
      <ProviderMealsClient meals={meals} />
    </div>
  );
};

export default ProviderDetails;