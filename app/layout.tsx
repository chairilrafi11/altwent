import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { NostalgicNavbar } from "@/components/nostalgic";

const sans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

export const metadata: Metadata = {
  title: "10 Years Later - SMP 2016 Memories",
  description: "A nostalgic digital yearbook celebrating 10 years of friendship since middle school",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en" suppressHydrationWarning>
    <body
      className={cn(
        sans.variable,
        mono.variable,
        "antialiased bg-background min-h-screen"
      )}
    >
      <NostalgicNavbar />
      <main className="pt-20">
        {children}
      </main>
      <Analytics />
      <Toaster />
    </body>
  </html>
);

export default RootLayout;
