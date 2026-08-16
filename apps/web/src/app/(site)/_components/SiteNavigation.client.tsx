"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";

import { isCurrentNavigationItem, siteNavigationItems } from "./site-navigation";
import styles from "./SiteShell.module.css";

const mobileDialogId = "site-mobile-navigation";

interface NavigationListProps {
  onNavigate?: () => void;
}

function NavigationList({ onNavigate }: NavigationListProps) {
  const pathname = usePathname();

  return (
    <ul className={styles.navigationList}>
      {siteNavigationItems.map((item) => (
        <li key={item.href}>
          <NextLink
            aria-current={isCurrentNavigationItem(pathname, item.href) ? "page" : undefined}
            className={styles.navigationLink}
            href={item.href}
            {...(onNavigate ? { onClick: onNavigate } : {})}
          >
            {item.label}
          </NextLink>
        </li>
      ))}
    </ul>
  );
}

export function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const previousBodyOverflowRef = useRef<string | null>(null);
  const restoreFocusRef = useRef(true);

  const restoreBodyScroll = useCallback(() => {
    if (previousBodyOverflowRef.current === null) {
      return;
    }

    document.body.style.overflow = previousBodyOverflowRef.current;
    previousBodyOverflowRef.current = null;
  }, []);

  const requestClose = useCallback((restoreFocus: boolean) => {
    restoreFocusRef.current = restoreFocus;
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (!isOpen) {
      if (dialog.open) {
        dialog.close();
      }

      return;
    }

    previousBodyOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) {
      dialog.showModal();
    }

    closeButtonRef.current?.focus();

    return () => {
      restoreBodyScroll();

      if (dialog.open) {
        dialog.close();
      }
    };
  }, [isOpen, restoreBodyScroll]);

  useEffect(() => {
    const closeIfDesktopNavigationIsVisible = () => {
      const menuButton = menuButtonRef.current;

      if (
        dialogRef.current?.open &&
        menuButton &&
        getComputedStyle(menuButton).display === "none"
      ) {
        requestClose(false);
      }
    };

    window.addEventListener("resize", closeIfDesktopNavigationIsVisible);

    return () => {
      window.removeEventListener("resize", closeIfDesktopNavigationIsVisible);
    };
  }, [requestClose]);

  const handleDialogClose = () => {
    restoreBodyScroll();
    setIsOpen(false);

    if (restoreFocusRef.current) {
      queueMicrotask(() => menuButtonRef.current?.focus());
    }
  };

  const handleDialogClick = (event: ReactMouseEvent<HTMLDialogElement>) => {
    if (event.target === event.currentTarget) {
      requestClose(true);
    }
  };

  const handleDialogKeyDown = (event: ReactKeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      requestClose(true);
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    const focusableElements = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
    );
    const firstElement = focusableElements.at(0);
    const lastElement = focusableElements.at(-1);

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement?.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement?.focus();
    }
  };

  return (
    <>
      <nav aria-label="Primary" className={`${styles.desktopNavigation} hidden lg:flex`}>
        <NavigationList />
      </nav>

      <button
        aria-controls={mobileDialogId}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        className={`${styles.menuButton} lg:hidden`}
        onClick={() => {
          restoreFocusRef.current = true;
          setIsOpen(true);
        }}
        ref={menuButtonRef}
        type="button"
      >
        Menu
      </button>

      <dialog
        aria-labelledby="mobile-navigation-title"
        aria-modal="true"
        className={styles.mobileDialog}
        data-theme="dark"
        id={mobileDialogId}
        onCancel={(event) => {
          event.preventDefault();
          requestClose(true);
        }}
        onClick={handleDialogClick}
        onClose={handleDialogClose}
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
      >
        <div className={styles.mobileDialogFrame}>
          <div className={styles.mobileDialogHeader}>
            <div className={styles.brandLockup}>
              <span className={styles.wordmark}>ORVAUXE</span>
              <span className={styles.descriptor}>Commerce Atelier</span>
            </div>
            <button
              aria-label="Close navigation"
              className={styles.closeButton}
              onClick={() => requestClose(true)}
              ref={closeButtonRef}
              type="button"
            >
              Close
            </button>
          </div>

          <nav aria-label="Mobile">
            <h2 className={styles.visuallyHidden} id="mobile-navigation-title">
              Site navigation
            </h2>
            <NavigationList onNavigate={() => requestClose(true)} />
          </nav>

          <p className={styles.mobileOrigin}>{"Chengdu \u00b7 Worldwide"}</p>
        </div>
      </dialog>
    </>
  );
}
