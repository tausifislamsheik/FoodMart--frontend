import MealManagerClient from "@/components/dashboard/providerDashboard/MealManagerClient";
import { userService } from "@/services/user.service";

const ManageMealPage = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (user?.role !== "PROVIDER") {
    return <p className="p-6">You are not authorized</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Meals</h1>
      <MealManagerClient userId={user.id} />
    </div>
  );
};

export default ManageMealPage;