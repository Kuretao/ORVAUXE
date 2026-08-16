import NextLink from "next/link";

import { SiteNavigation } from "./SiteNavigation.client";
import styles from "./SiteShell.module.css";

export function SiteHeader() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.headerFrame}>
        <div className={styles.brandLockup}>
          <NextLink aria-label="ORVAUXE home" className={styles.wordmark} href="/">
            ORVAUXE
          </NextLink>
          <span className={styles.descriptor}>Commerce Atelier</span>
        </div>
        <SiteNavigation />
      </div>
    </header>
  );
}
