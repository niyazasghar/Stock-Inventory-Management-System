
import GlobalLoading from "@/components/GlobalLoading";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./authContext";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StockOps | Inventory & Order Management Platform",
  description:
    "Inventory, orders, warehouses, invoices, and stock movement from one control center. A DevShuttle Lab Build.",
  authors: [
    {
      name: "DevShuttle",
    },
  ],
  keywords: [
    "StockOps",
    "Inventory Management",
    "Order Management",
    "Warehouse System",
    "DevShuttle Lab Build",
    "SaaS",
  ],
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "StockOps | Inventory & Order Management Platform",
    description:
      "Control inventory, orders, warehouses, and invoices without spreadsheet chaos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "StockOps Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StockOps | Inventory & Order Management Platform",
    description:
      "Control inventory, orders, warehouses, and invoices without spreadsheet chaos.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Suspense fallback={<div>Loading...</div>}>
              <GlobalLoading />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          </ThemeProvider>
          <Toaster />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
