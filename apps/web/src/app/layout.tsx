import type { Metadata } from "next";
import type { ReactNode } from "react";

import { getServerEnv } from "@/config/env.server";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

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
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
