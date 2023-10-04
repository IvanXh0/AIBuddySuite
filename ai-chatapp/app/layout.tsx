import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/navbar";

const monsterrat = Montserrat({ subsets: ["latin"], weight: "600" });

export const metadata: Metadata = {
  title: "AIBuddySuite",
  description: "An AI Companion App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("bg-slate-200", monsterrat.className)}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
