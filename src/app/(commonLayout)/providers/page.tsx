import ProvidersClient from "@/components/providersPage/ProvidersClient";
import { categoryService } from "@/services/category.service";
import { providerService } from "@/services/provider.service";

const ProvidersPage = async () => {
  const [providersRes, categoriesRes] = await Promise.all([
    providerService.getAllProviders(),
    categoryService.getAllCategories(),
  ]);

  const providers = providersRes.data ?? [];
  const categories = categoriesRes.data ?? [];

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Providers</h1>
      <p className="text-gray-700 text-lg mb-6">
        FoodMart - Discover & Order Delicious Meals
      </p>

      <ProvidersClient providers={providers} categories={categories} />
    </div>
  );
};

export default ProvidersPage;