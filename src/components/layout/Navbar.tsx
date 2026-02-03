"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ModeToggle } from "./MoodToggle";

interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  role: "CUSTOMER" | "PROVIDER" | "ADMIN";
  status: "ACTIVE" | "SUSPENDED";
}

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (session) setUserInfo(session.user as User);
    else setUserInfo(null);
  }, [session]);

  const handleSignOut = async () => {
    const toastId = toast.loading("Logging out...");
    setLoading(true);

    try {
      await authClient.signOut();
      toast.success("You have been signed out!", { id: toastId });
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const baseNavItems = [
    { name: "Home", href: "/" },
    { name: "Meals", href: "/meals" },
    { name: "Providers", href: "/providers" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const dashboardLink = userInfo
    ? {
        name: "Dashboard",
        href:
          userInfo.role === "ADMIN"
            ? "/dashboard/admin"
            : userInfo.role === "PROVIDER"
              ? "/dashboard/provider"
              : "/dashboard/customer",
      }
    : null;

  const navItems = dashboardLink
    ? [...baseNavItems, dashboardLink]
    : baseNavItems;

  return (
    <header className="w-full border-b bg-background text-foreground">
      <nav className="max-w-350 mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-3xl">
          <i>
            Food<span className="text-orange-500 font-bold">Mart</span>
          </i>
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`transition ${
                  isActive
                    ? "text-primary font-semibold underline underline-offset-4"
                    : "hover:text-primary hover:underline hover:underline-offset-4"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <ModeToggle />
          <div className="flex gap-3">
            {userInfo ? (
              <>
                <Button
                  variant="default"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="cursor-pointer bg-orange-500 hover:bg-orange-600"
                >
                  {loading ? "Signing Out..." : "Sign Out"}
                </Button>
              </>
            ) : (
              <>
                <Button
                  className="cursor-pointer text-orange-500"
                  variant="outline"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button className="cursor-pointer bg-orange-500" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                ☰
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-64 flex flex-col max-h-screen overflow-y-auto pb-10"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-5 px-4">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <SheetTrigger key={item.name} asChild>
                      <Link
                        href={item.href}
                        className={`text-lg transition ${
                          isActive
                            ? "text-primary underline font-semibold"
                            : "hover:text-primary hover:font-semibold hover:underline"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </SheetTrigger>
                  );
                })}
                <ModeToggle />
                <hr className="my-4" />

                {userInfo ? (
                  <Button
                    variant="default"
                    className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600"
                    onClick={handleSignOut}
                    disabled={loading}
                  >
                    {loading ? "Signing Out..." : "Sign Out"}
                  </Button>
                ) : (
                  <>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full cursor-pointer text-orange-500"
                        asChild
                      >
                        <Link href="/login">Sign In</Link>
                      </Button>
                    </SheetTrigger>

                    <SheetTrigger asChild>
                      <Button
                        className="w-full cursor-pointer bg-orange-500"
                        asChild
                      >
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </SheetTrigger>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
