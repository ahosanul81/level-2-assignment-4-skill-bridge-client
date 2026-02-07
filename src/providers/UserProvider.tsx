"use client";

import { createContext, ReactNode } from "react";

type UserProviderProps = {
  children: ReactNode;
};

export const UserContext = createContext(null);

export function UserProvider({ children }: UserProviderProps) {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
}
