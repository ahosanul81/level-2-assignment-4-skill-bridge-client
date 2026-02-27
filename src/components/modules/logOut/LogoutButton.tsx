"use client";

import { useRouter } from "next/navigation";

import { auth } from "@/services/auth/auth";
import { toast } from "sonner";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const res = await auth.signOut();
    if (res.data.success) {
      router.replace("/login");
      router.refresh();
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}
