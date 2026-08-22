"use client";

import { trackClient } from "@orvauxe/analytics/client";
import { useEffect, useRef } from "react";

export function StudioViewTracker() {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    trackClient("studio_viewed", { page_path: "/studio" });
  }, []);

  return null;
}
