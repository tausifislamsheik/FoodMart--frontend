import Sidebar from "@/components/dashboard/Sidebar";
import { userService } from "@/services/user.service";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <Sidebar role={user?.role} />
      <main className="flex-1 p-4 md:p-6 bg-gray-50 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}