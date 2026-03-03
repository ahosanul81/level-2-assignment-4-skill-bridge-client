// src/middleware.ts

import { NextRequest, NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET!);

export async function proxy(request: NextRequest) {
  // const token = request.cookies.get("accessToken")?.value;

  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // try {
  //   const { payload } = await jwtVerify(token, secret);

  //   const pathname = request.nextUrl.pathname;

  //   if (pathname === "/dashboard") {
  //     if (payload.role === "ADMIN") {
  //       return NextResponse.redirect(
  //         new URL("/dashboard/admin/bookings", request.url),
  //       );
  //     }

  //     if (payload.role === "TUTOR") {
  //       return NextResponse.redirect(
  //         new URL("/dashboard/tutor/bookings", request.url),
  //       );
  //     }
  //   }

  //   if (pathname.startsWith("/dashboard/admin") && payload.role !== "ADMIN") {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   if (pathname.startsWith("/dashboard/tutor") && payload.role !== "TUTOR") {
  //     return NextResponse.redirect(new URL("/login", request.url));
  //   }

  //   return NextResponse.next();
  // } catch (error) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}
export const config = {
  matcher: ["/dashboard/:path*"],
};
