"use client";

import { Grid, Text } from "@orvauxe/ui";
import { useEffect, useRef, useState } from "react";

import type { HomePageData, StorefrontViewKind } from "../model/home-page";
import { nocturneStorefrontStages } from "../model/nocturne-storefront";
import styles from "./HomeProductStory.module.css";
import { NocturneStorefront } from "./NocturneStorefront";

interface HomeStorefrontSystemClientProps {
  edition: HomePageData["editions"]["featured"];
}

const desktopEnhancementQuery =
  "(min-width: 64rem) and (min-height: 50rem) and (prefers-reduced-motion: no-preference)";

export function HomeStorefrontSystemClient({ edition }: HomeStorefrontSystemClientProps) {
  const [activeKind, setActiveKind] = useState<StorefrontViewKind>("home");
  const [hasInteracted, setHasInteracted] = useState(false);
  const stepElements = useRef<Array<HTMLLIElement | null>>([]);

  function selectKind(kind: StorefrontViewKind) {
    setActiveKind(kind);
    setHasInteracted(true);
  }

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia(desktopEnhancementQuery);
    let observer: IntersectionObserver | null = null;

    function stopObserver() {
      observer?.disconnect();
      observer = null;
    }

    function configureObserver() {
      stopObserver();

      if (!mediaQuery.matches || typeof IntersectionObserver === "undefined") return;

      observer = new IntersectionObserver(
        (entries) => {
          const visibleEntry = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (first, second) =>
                Math.abs(first.boundingClientRect.top - window.innerHeight * 0.44) -
                Math.abs(second.boundingClientRect.top - window.innerHeight * 0.44),
            )[0];

          const kind = visibleEntry?.target.getAttribute(
            "data-system-step",
          ) as StorefrontViewKind | null;
          if (kind) selectKind(kind);
        },
        { rootMargin: "-36% 0px -44% 0px", threshold: 0 },
      );

      for (const element of stepElements.current) {
        if (element) observer.observe(element);
      }
    }

    configureObserver();
    mediaQuery.addEventListener("change", configureObserver);

    return () => {
      stopObserver();
      mediaQuery.removeEventListener("change", configureObserver);
    };
  }, []);

  return (
    <div data-system-state={activeKind}>
      <div className={styles.systemDesktop}>
        <Grid className={styles.systemDesktopGrid}>
          <div className={styles.systemSticky}>
            <div
              className={styles.systemPreview}
              data-system-transition={hasInteracted ? "active" : "initial"}
              key={activeKind}
            >
              <NocturneStorefront
                edition={edition}
                kind={activeKind}
                mobileSizes="(min-width: 96rem) 22rem, 21vw"
                sizes="(min-width: 96rem) 62rem, 64vw"
              />
            </div>
          </div>

          <ol aria-label="Included storefront views" className={styles.systemStepList}>
            {nocturneStorefrontStages.map((stage, index) => (
              <li
                className={styles.systemStep}
                data-system-step={stage.kind}
                key={stage.kind}
                ref={(element) => {
                  stepElements.current[index] = element;
                }}
              >
                <button
                  aria-pressed={activeKind === stage.kind}
                  className={styles.systemStepButton}
                  onClick={() => selectKind(stage.kind)}
                  onFocus={() => selectKind(stage.kind)}
                  type="button"
                >
                  <span className={styles.systemStepContent}>
                    <span className={styles.systemStepTitle}>
                      <Text as="span" variant="label">
                        {stage.label}
                      </Text>
                      <Text as="span" variant="caption">
                        {stage.index}
                      </Text>
                    </span>
                    <Text as="span" className={styles.systemStepDescription} variant="body-sm">
                      {stage.description}
                    </Text>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </Grid>
      </div>

      <ol aria-label="Included storefront views" className={styles.systemRail} tabIndex={0}>
        {nocturneStorefrontStages.map((stage) => (
          <li className={styles.systemRailItem} key={stage.kind}>
            <div className={styles.systemRailHeading}>
              <Text as="span" variant="caption">
                {stage.index}
              </Text>
              <Text as="span" variant="label">
                {stage.label}
              </Text>
              <Text as="span" className={styles.systemRailDescription} variant="body-sm">
                {stage.description}
              </Text>
            </div>
            <NocturneStorefront
              edition={edition}
              kind={stage.kind}
              mobileSizes="(min-width: 90rem) 16rem, (min-width: 64rem) 19vw, (min-width: 48rem) 24vw, 30vw"
              showCaption={false}
              sizes="(min-width: 48rem) 68vw, 88vw"
            />
          </li>
        ))}
      </ol>
    </div>
  );
}
