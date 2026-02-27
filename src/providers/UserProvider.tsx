"use client";

import { auth } from "@/services/auth/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  emailVerified: boolean;
} | null;

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<User>(null);

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const loadSession = async () => {
      try {
        const res = await auth.getSession();
        setUser(res?.data?.data ?? null);
      } catch (err) {
        setUser(null);
      }
    };

    loadSession();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
