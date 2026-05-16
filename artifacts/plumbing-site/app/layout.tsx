import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--app-font-sans" });

export const metadata: Metadata = {
  title: "Premier Plumbing Contractors | Commercial & Residential Services",
  description:
    "Full-service plumbing contractor specializing in commercial and residential projects. Trusted by Fortune 500 companies. Request a free estimate today.",
  keywords: [
    "plumbing contractor",
    "commercial plumbing",
    "residential plumbing",
    "plumbing services",
    "pipe installation",
    "plumbing repair",
  ],
  openGraph: {
    title: "Premier Plumbing Contractors | Commercial & Residential Services",
    description:
      "Full-service plumbing contractor specializing in commercial and residential projects.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans flex flex-col min-h-screen`}>
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
