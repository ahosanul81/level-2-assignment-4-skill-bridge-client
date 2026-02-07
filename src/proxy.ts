// src/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { user } from "./services/user/user"; // server-safe Better Auth wrapper

export async function proxy(request: NextRequest) {
  try {
    const { data } = await user.getSession();

    // If no user, redirect to login
    if (!data?.user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Role-based redirects for dashboard root
    const pathname = request.nextUrl.pathname;

    if (pathname === "/dashboard") {
      if (data.user.role === "ADMIN") {
        return NextResponse.redirect(
          new URL("/dashboard/admin/bookings", request.url),
        );
      } else if (data.user.role === "TUTOR") {
        return NextResponse.redirect(
          new URL("/dashboard/tutor/bookings", request.url),
        );
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // Optional: protect all dashboard routes
    if (pathname.startsWith("/dashboard")) {
      if (
        data.user.role === "ADMIN" &&
        pathname.startsWith("/dashboard/admin")
      ) {
        return NextResponse.next();
      } else if (
        data.user.role === "TUTOR" &&
        pathname.startsWith("/dashboard/tutor")
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(new URL("/login", request.url));
      }
    }

    // For other routes, allow
    return NextResponse.next();
  } catch (err) {
    console.error("Proxy middleware error:", err);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Only run middleware on dashboard routes
export const config = {
  matcher: ["/dashboard/:path*"], // protects all /dashboard routes
};
