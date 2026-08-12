import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Skillpath - Dynamic Course Catalog & Learning Platform",
  description: "Fault-tolerant learning platform landing page built with Next.js, dynamic currency math, and bluish glassmorphic UI.",
  keywords: ["Skillpath", "Next.js", "Glassmorphism", "Course Platform", "Fault Tolerant API"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${jetbrainsMono.variable} dark scroll-smooth`}>
      <body className="bg-[#030712] text-slate-100 font-sans antialiased min-h-[100dvh] overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
