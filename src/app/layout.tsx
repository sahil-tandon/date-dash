import type { Metadata } from "next";
import { Barrio, Oooh_Baby, Pompiere } from "next/font/google";
import "./globals.css";
import { CloudBackground } from "@/components/CloudBackground";

const barrio = Barrio({
  weight: "400",
  variable: "--font-barrio",
  subsets: ["latin"],
});

const ooohBaby = Oooh_Baby({
  weight: "400",
  variable: "--font-oooh-baby",
  subsets: ["latin"],
});

const pompiere = Pompiere({
  weight: "400",
  variable: "--font-pompiere",
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
        className={`${barrio.variable} ${ooohBaby.variable} ${pompiere.variable} font-pompiere antialiased bg-rose-100`}
      >
        <CloudBackground />
        <main className="relative min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}