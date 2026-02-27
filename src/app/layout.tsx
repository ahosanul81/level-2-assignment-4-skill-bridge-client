import type { Metadata } from "next";

import "./globals.css";

import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "sonner";
import { UserProvider } from "@/providers/UserProvider";

export const metadata: Metadata = {
  title: "Skill Bridge",
  description: "A schooling app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={` antialiased`}>
        <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors />
          </ThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
