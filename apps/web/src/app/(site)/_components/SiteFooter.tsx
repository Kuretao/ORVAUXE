import styles from "./SiteShell.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.siteFooter} data-theme="dark">
      <div className={styles.footerFrame}>
        <div className={styles.footerBrand}>
          <span className={styles.footerWordmark}>ORVAUXE</span>
          <span className={styles.footerDescriptor}>Commerce Atelier</span>
        </div>
        <p className={styles.origin}>{"Chengdu \u00b7 Worldwide"}</p>
        <p className={styles.copyright}>
          {"\u00a9"} {new Date().getUTCFullYear()} ORVAUXE
        </p>
      </div>
    </footer>
  );
}
