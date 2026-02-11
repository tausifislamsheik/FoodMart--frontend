import { userService } from "@/services/user.service";
import { NextRequest, NextResponse } from "next/server";

const Roles = {
  admin: "ADMIN",
  provider: "PROVIDER",
  customer: "CUSTOMER",
} as const;

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;
  let isProvider = false;
  let isCustomer = false;

  const { data } = await userService.getSession();

  if (data) {
    isAuthenticated = true;
    if (data.role === Roles.admin) {
      isAdmin = true;
    } else if (data.role === Roles.provider) {
      isProvider = true;
    } else if (data.role === Roles.customer) {
      isCustomer = true;
    }
  }


  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/dashboard") {
    if (isAdmin) {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    }

    if (isProvider) {
      return NextResponse.redirect(new URL("/dashboard/provider", request.url));
    }

    if (isCustomer) {
      return NextResponse.redirect(new URL("/dashboard/customer", request.url));
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAdmin && pathname.startsWith("/dashboard/provider")) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  if (isAdmin && pathname.startsWith("/dashboard/customer")) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  if (!isAdmin && isProvider && pathname.startsWith("/dashboard/admin")) {
    return NextResponse.redirect(new URL("/dashboard/provider", request.url));
  }

  if (!isAdmin && isProvider && pathname.startsWith("/dashboard/customer")) {
    return NextResponse.redirect(new URL("/dashboard/provider", request.url));
  }

  if (
    !isAdmin &&
    !isProvider &&
    isCustomer &&
    pathname.startsWith("/dashboard/admin")
  ) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }

  if (
    !isAdmin &&
    !isProvider &&
    isCustomer &&
    pathname.startsWith("/dashboard/provider")
  ) {
    return NextResponse.redirect(new URL("/dashboard/customer", request.url));
  }
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/dashboard/admin",
    "/dashboard/admin/:path*",
    "/dashboard/provider",
    "/dashboard/provider/:path*",
    "/dashboard/customer",
    "/dashboard/customer/:path*",
  ],
};