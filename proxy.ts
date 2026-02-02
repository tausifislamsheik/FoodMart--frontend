import { NextRequest, NextResponse } from "next/server";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_URL;

const DASHBOARD_MAP = {
  ADMIN: "/dashboard/admin",
  CUSTOMER: "/dashboard/customer",
  PROVIDER: "/dashboard/provider",
} as const;

type Role = keyof typeof DASHBOARD_MAP;

export async function proxy(request: NextRequest) {
  try {
    const pathname = request.nextUrl.pathname;

    const cookie = request.headers.get("cookie") || "";

    const res = await fetch(`${AUTH_API}/get-session`, {
      headers: {
        Cookie: cookie,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const session = await res.json();

    if (!session?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const role = session.user.role as Role;
    const dashboardPath = DASHBOARD_MAP[role];

    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    if (!pathname.startsWith(dashboardPath)) {
      return NextResponse.redirect(new URL(dashboardPath, request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Proxy auth error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};