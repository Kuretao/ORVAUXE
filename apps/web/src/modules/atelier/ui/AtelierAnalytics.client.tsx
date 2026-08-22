"use client";

import { trackClient } from "@orvauxe/analytics/client";
import { useEffect, useRef } from "react";

export function AtelierViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackClient("atelier_viewed", { page_path: "/atelier" });
  }, []);

  return null;
}
