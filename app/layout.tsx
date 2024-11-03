import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/themeProvider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/navBar";
import QueryProvider from "@/providers/queryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BlogSpace",
  description: "Share your thoughts with the world",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
