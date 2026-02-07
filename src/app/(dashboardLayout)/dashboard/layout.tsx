/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Navbar2 } from "@/components/layouts/navbar2";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";

interface IUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: "ADMIN" | "TUTOR" | "STUDENT";
}

interface ISessionData {
  user: IUser;
}

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: IDashboardLayoutProps) {
  const { data } = authClient.useSession() as {
    data: ISessionData | null;
    error: any;
  };

  let navlinks: { url: string; label: string }[] = [];

  if (data?.user.role === "ADMIN") {
    navlinks = [{ url: "/dashboard/admin/bookings", label: "Bookings" }];
  } else if (data?.user.role === "TUTOR") {
    navlinks = [{ url: "/dashboard/tutor/bookings", label: "Bookings" }];
  }

  return (
    <div>
      <Navbar2 />
      <div className="flex gap-4">
        <div className="w-1/5">
          <Card className="h-screen pl-5">
            <CardHeader>{data?.user.role} Dashboard</CardHeader>
            {navlinks.map((item) => (
              <CardTitle key={item.url}>
                <Link href={item.url}>{item.label}</Link>
              </CardTitle>
            ))}
          </Card>
        </div>
        <div className="w-4/5">{children}</div>
      </div>
    </div>
  );
}
