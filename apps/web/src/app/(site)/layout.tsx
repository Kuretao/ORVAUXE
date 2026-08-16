import type { Metadata } from "next";
import { draftMode } from "next/headers";
import type { ReactNode } from "react";

import { SiteFooter } from "./_components/SiteFooter";
import { SiteHeader } from "./_components/SiteHeader";
import { SkipLink } from "./_components/SkipLink";
import styles from "./_components/SiteShell.module.css";

export async function generateMetadata(): Promise<Metadata> {
  const preview = (await draftMode()).isEnabled;

  return preview
    ? {
        robots: {
          follow: false,
          index: false,
          nocache: true,
        },
      }
    : {};
}

export default function SiteLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <SkipLink />
      <div className={styles.siteShell}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </div>
    </>
  );
}
