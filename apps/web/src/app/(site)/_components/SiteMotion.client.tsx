"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const revealSelector = "[data-motion-reveal]";

type MotionState = "pending" | "revealed" | "static";

function setMotionState(element: HTMLElement, state: MotionState) {
  element.dataset.motionState = state;
}

export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));
    if (document.documentElement.dataset.motion === "settled") {
      for (const element of elements) setMotionState(element, "static");
      return;
    }

    if (typeof window.matchMedia !== "function") {
      for (const element of elements) setMotionState(element, "static");
      return;
    }

    const mediaQuery = window.matchMedia(reducedMotionQuery);
    let observer: IntersectionObserver | null = null;
    let inspectionFrame = 0;
    const pendingElements = new Set<HTMLElement>();

    function reveal(element: HTMLElement) {
      pendingElements.delete(element);
      setMotionState(element, "revealed");
      observer?.unobserve(element);
    }

    function inspectPendingElements() {
      inspectionFrame = 0;
      const immediateBoundary = window.innerHeight * 0.88;

      for (const element of pendingElements) {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top <= immediateBoundary) reveal(element);
      }
    }

    function schedulePendingInspection() {
      if (inspectionFrame || pendingElements.size === 0) return;
      inspectionFrame = window.requestAnimationFrame(inspectPendingElements);
    }

    function stopObserver() {
      observer?.disconnect();
      observer = null;
      pendingElements.clear();
      if (inspectionFrame) window.cancelAnimationFrame(inspectionFrame);
      inspectionFrame = 0;
    }

    function configureMotion() {
      stopObserver();

      if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
        for (const element of elements) setMotionState(element, "static");
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) continue;

            reveal(entry.target as HTMLElement);
          }
        },
        { rootMargin: "0px 0px -12% 0px", threshold: [0, 0.12] },
      );

      const immediateBoundary = window.innerHeight * 0.88;
      for (const element of elements) {
        const bounds = element.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top <= immediateBoundary) {
          setMotionState(element, "revealed");
        } else {
          setMotionState(element, "pending");
          pendingElements.add(element);
          observer.observe(element);
        }
      }
    }

    configureMotion();
    mediaQuery.addEventListener("change", configureMotion);
    window.addEventListener("scroll", schedulePendingInspection, { passive: true });

    return () => {
      stopObserver();
      mediaQuery.removeEventListener("change", configureMotion);
      window.removeEventListener("scroll", schedulePendingInspection);
      for (const element of elements) element.removeAttribute("data-motion-state");
    };
  }, [pathname]);

  return null;
}
