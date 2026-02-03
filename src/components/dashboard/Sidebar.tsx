"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

const LINKS = {
  CUSTOMER: [
    { label: "Profile", href: "/dashboard/customer" },
    { label: "My Orders", href: "/dashboard/customer/orders" },
    { label: "My Cart", href: "/dashboard/customer/my-carts" },
    { label: "Home", href: "/" },
  ],
  PROVIDER: [
    { label: "Restaurant Info", href: "/dashboard/provider" },
    { label: "Profile", href: "/dashboard/provider/profile" },
    { label: "Manage Meal", href: "/dashboard/provider/meals" },
    { label: "Orders", href: "/dashboard/provider/orders" },
    { label: "Home", href: "/" },
  ],
  ADMIN: [
    { label: "Profile", href: "/dashboard/admin" },
    { label: "Users", href: "/dashboard/admin/users" },
    { label: "Orders", href: "/dashboard/admin/orders" },
    { label: "Categories", href: "/dashboard/admin/categories" },
    { label: "Home", href: "/" },
  ],
};

export default function Sidebar({ role }: { role: Role }) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const links = LINKS[role];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b p-3 flex items-center">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="left"
            className="w-64 flex flex-col h-full overflow-y-auto"
          >
            <SheetTitle className="mt-3 pl-3.5 text-xl">
              <i>
                Food<span className="text-orange-500 font-bold">Mart</span>
              </i>
            </SheetTitle>
            <SidebarContent
              links={links}
              onLinkClick={() => setSheetOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <h2 className="ml-3 font-bold">Dashboard</h2>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 bg-white border-r min-h-screen p-5">
        <SidebarContent links={links} />
      </aside>
    </>
  );
}

function SidebarContent({
  links,
  onLinkClick,
}: {
  links: { label: string; href: string }[];
  onLinkClick?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <h2 className="hidden md:flex ml-3 text-2xl font-bold mb-3">Dashboard</h2>
      <hr className="border" />
      <ul className="space-y-3 mt-5">
        {links?.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onLinkClick}
                className={`block font-medium rounded-md px-3 py-2 transition hover:bg-orange-100 ${
                  isActive ? "bg-orange-500 text-white font-semibold" : ""
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}