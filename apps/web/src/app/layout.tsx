import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { getServerEnv } from "@/config/env.server";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const displayFont = Bodoni_Moda({
  display: "swap",
  fallback: ["Times New Roman", "serif"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-orvauxe-display",
  weight: ["400", "500"],
});

const interfaceFont = Inter({
  display: "swap",
  fallback: ["Arial", "sans-serif"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-orvauxe-interface",
  weight: ["400", "500", "600"],
});

export function generateMetadata(): Metadata {
  const isProduction = getServerEnv().VERCEL_ENV === "production";

  return {
    metadataBase: new URL(siteConfig.url),
    title: siteConfig.name,
    description: siteConfig.description,
    ...(isProduction
      ? {}
      : {
          robots: {
            follow: false,
            index: false,
            nocache: true,
          },
        }),
  };
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={siteConfig.locale}>
      <body className={`${displayFont.variable} ${interfaceFont.variable}`}>{children}</body>
    </html>
  );
}
