import CustomerProfileClient from "@/components/dashboard/customerPage/CustomerProfileClient";
import { userService } from "@/services/user.service";

const CustomerProfile = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  return (
    <div className="p-4">
      <CustomerProfileClient user={user} />
    </div>
  );
};

export default CustomerProfile;