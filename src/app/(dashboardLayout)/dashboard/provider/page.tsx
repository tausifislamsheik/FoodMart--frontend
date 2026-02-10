import ProviderProfileClient from "@/components/dashboard/providerDashboard/ProviderProfileClient";
import { providerService } from "@/services/provider.service";
import { userService } from "@/services/user.service";

const ProviderOverview = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user || user.role !== "PROVIDER") {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-red-500 font-medium">Access denied</p>
      </div>
    );
  }

  const { data: providers } = await providerService.getAllProviders();

  const myProfile = providers?.find(
    (provider: any) => provider.userId === user.id,
  );

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-1 text-center">
        Welcome <span className="text-orange-600 font-bold"><i>{user.name}!</i></span>
      </h1>
      <p className="text-sm text-center text-muted-foreground mb-6 font-semibold">
         {user.role}
      </p>

      <ProviderProfileClient profile={myProfile || null} />
    </div>
  );
};

export default ProviderOverview;