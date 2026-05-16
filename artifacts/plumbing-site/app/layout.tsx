import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--app-font-sans" });

export const metadata: Metadata = {
  title: "J&O Pro Bro's | Commercial & Residential Plumbing Contractors",
  description:
    "J&O Pro Bro's — full-service plumbing contractor specializing in large commercial projects and residential services. Trusted by Samsung. Request a free estimate today.",
  keywords: [
    "plumbing contractor",
    "commercial plumbing",
    "residential plumbing",
    "plumbing services",
    "pipe installation",
    "plumbing repair",
    "J&O Pro Bros",
  ],
  openGraph: {
    title: "J&O Pro Bro's | Commercial & Residential Plumbing Contractors",
    description:
      "Full-service plumbing contractor specializing in large commercial projects and residential services.",
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
