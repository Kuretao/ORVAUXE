"use client";

import { trackClient } from "@orvauxe/analytics/client";
import { Link } from "@orvauxe/ui";
import type { ComponentProps } from "react";

type TrackedHomeLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  href: string;
  placement: "final" | "hero";
};

const trackingByPlacement = {
  final: {
    cta_id: "home_final_start_project",
    cta_location: "home_final_cta",
  },
  hero: {
    cta_id: "home_hero_start_project",
    cta_location: "home_hero",
  },
} as const;

export function TrackedHomeLink({ href, placement, ...props }: TrackedHomeLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={() => {
        trackClient("start_project_clicked", trackingByPlacement[placement]);
      }}
    />
  );
}
