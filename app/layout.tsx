import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import NavbarServer from "@/components/NavbarServer";
import QueryProvider from "@/providers/queryProvider";
import UserProvider from "@/providers/user-provider";
import { getUser } from "@/lib/server/auth";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogSpace",
  description: "Share your thoughts with the world",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <UserProvider user={user}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen bg-background">
                <Suspense fallback={<nav className="border-b h-[57px]" />}>
                  <NavbarServer />
                </Suspense>
                <main>{children}</main>
                <Toaster />
              </div>
            </ThemeProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
