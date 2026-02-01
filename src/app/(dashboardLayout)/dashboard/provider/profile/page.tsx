import ProfileProviderClient from "@/components/dashboard/providerDashboard/ProfileProviderClient";
import { userService } from "@/services/user.service";

const ProviderProfile = async () => {
  const { data } = await userService.getSession();
  const user = data?.user;

  return (
    <div className="p-4">
      <ProfileProviderClient user={user} />
    </div>
  );
};

export default ProviderProfile;