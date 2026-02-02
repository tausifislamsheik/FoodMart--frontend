// "use client";

// import { Menu } from "lucide-react";

// import { cn } from "@/lib/utils";

// import {
//   Accordion,
// } from "@/components/ui/accordion";
// import { Button } from "@/components/ui/button";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import {
//   Sheet,
//   SheetContent,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import Link from "next/link";
// import { ModeToggle } from "./MoodToggle";

// interface MenuItem {
//   title: string;
//   url: string;
//   description?: string;
//   icon?: React.ReactNode;
//   items?: MenuItem[];
// }

// interface Navbar1Props {
//   className?: string;
//   logo?: {
//     url: string;
//     src: string;
//     alt: string;
//     title: string;
//     className?: string;
//   };
//   menu?: MenuItem[];
//   auth?: {
//     login: {
//       title: string;
//       url: string;
//     };
//     signup: {
//       title: string;
//       url: string;
//     };
//   };
// }

// const Navbar = ({
//   logo = {
//     url: "https://www.shadcnblocks.com",
//     src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
//     alt: "logo",
//     title: "Shadcnblocks.com",
//   },
//   menu = [
//     { title: "Home", url: "/" },
//     {
//       title: "Meals",
//       url: "/meals",
//     },
    
//     {
//       title: "Providers",
//       url: "/providers",
//     },
//     {
//       title: "About",
//       url: "/about",
//     },
//     {
//       title: "Contact",
//       url: "/contact",
//     },
//   ],
//   auth = {
//     login: { title: "Login", url: "/login" },
//     signup: { title: "Sign up", url: "/register" },
//   },
//   className,
// }: Navbar1Props) => {
//   return (
//     <section className={cn("py-4", className)}>
//       <div className="container px-7 mx-auto">
//         {/* Desktop Menu */}
//         <nav className="hidden items-center justify-between lg:flex">
//           <div className="flex items-center gap-6">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//               <span className="text-lg font-semibold tracking-tighter">
//                 {logo.title}
//               </span>
//             </a>
//             <div className="flex items-center">
//               <NavigationMenu>
//                 <NavigationMenuList>
//                   {menu.map((item) => renderMenuItem(item))}
//                 </NavigationMenuList>
//               </NavigationMenu>
//             </div>
//           </div>
//           <div className="flex gap-2">
//             <ModeToggle />
//             <Button asChild variant="outline" size="sm">
//               <Link href={auth.login.url}>{auth.login.title}</Link>
//             </Button>
//             <Button asChild size="sm">
//               <Link href={auth.signup.url}>{auth.signup.title}</Link>
//             </Button>
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         <div className="block lg:hidden">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <a href={logo.url} className="flex items-center gap-2">
//               <img
//                 src={logo.src}
//                 className="max-h-8 dark:invert"
//                 alt={logo.alt}
//               />
//             </a>
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="outline" size="icon">
//                   <Menu className="size-4" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent className="overflow-y-auto">
//                 <SheetHeader>
//                   <SheetTitle>
//                     <a href={logo.url} className="flex items-center gap-2">
//                       <img
//                         src={logo.src}
//                         className="max-h-8 dark:invert"
//                         alt={logo.alt}
//                       />
//                     </a>
//                   </SheetTitle>
//                 </SheetHeader>
//                 <div className="flex flex-col gap-6 p-4">
//                   <Accordion
//                     type="single"
//                     collapsible
//                     className="flex w-full flex-col gap-4"
//                   >
//                     {menu.map((item) => renderMobileMenuItem(item))}
//                   </Accordion>

//                   <div className="flex flex-col gap-3">
//                     <Button asChild variant="outline">
//                       <Link href={auth.login.url}>{auth.login.title}</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href={auth.signup.url}>{auth.signup.title}</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const renderMenuItem = (item: MenuItem) => {
//   return (
//     <NavigationMenuItem key={item.title}>
//       <NavigationMenuLink
//         href={item.url}
//         className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
//       >
//         <Link href={item.url}>{item.title}</Link>
//       </NavigationMenuLink>
//     </NavigationMenuItem>
//   );
// };

// const renderMobileMenuItem = (item: MenuItem) => {
//   return (
//     <Link key={item.title} href={item.url} className="text-md font-semibold">
//       {item.title}
//     </Link>
//   );
// };

// export { Navbar };



















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
        <Link href="/" className="text-3xl font-bold">
          Food<span className="text-orange-500">Mart</span>
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

          <div className="flex gap-3">
            {userInfo ? (
              <Button
                variant="default"
                onClick={handleSignOut}
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? "Signing Out..." : "Sign Out"}
              </Button>
            ) : (
              <>
                <Button className="cursor-pointer text-orange-500" variant="outline" asChild>
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

                <hr className="my-4" />

                {userInfo ? (
                  <Button
                    variant="default"
                    className="w-full cursor-pointer"
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
                      <Button className="w-full cursor-pointer bg-orange-500" asChild>
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
}


export default Navbar;
