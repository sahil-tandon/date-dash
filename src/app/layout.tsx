import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CloudBackground } from "@/components/CloudBackground";
import { FloatingHearts } from "@/components/FloatingHearts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DateDash - Find Your Perfect Date Idea",
  description: "Generate personalized date ideas based on your location",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CloudBackground />
        <FloatingHearts />
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}