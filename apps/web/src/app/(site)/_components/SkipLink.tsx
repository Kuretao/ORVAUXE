import styles from "./SiteShell.module.css";

export function SkipLink() {
  return (
    <a className={styles.skipLink} href="#main-content">
      Skip to content
    </a>
  );
}
