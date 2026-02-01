import AdminProfileClient from "@/components/dashboard/adminPage/AdminProfileClient";
import { userService } from "@/services/user.service";

const AdminOverview = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  return (
    <div className="p-4">
      <AdminProfileClient user={user} />
    </div>
  );
};

export default AdminOverview;