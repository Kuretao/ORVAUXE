"use client";

import { trackClient } from "@orvauxe/analytics/client";
import { Link } from "@orvauxe/ui";
import type { ComponentProps } from "react";
import { useEffect, useRef } from "react";

interface EditionViewTrackerProps {
  readonly category: string;
  readonly editionNumber: number;
  readonly slug: string;
}

type StartProjectPlacement =
  "edition_generic" | "editions_final" | "editions_hero" | "nocturne_final" | "nocturne_hero";

type TrackedEditionStartLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onClick"> & {
  readonly editionSlug?: string;
  readonly href: string;
  readonly placement: StartProjectPlacement;
};

const trackingByPlacement = {
  edition_generic: {
    cta_id: "edition_start_project",
    cta_location: "edition_detail",
  },
  editions_final: {
    cta_id: "editions_final_start_project",
    cta_location: "editions_final_cta",
  },
  editions_hero: {
    cta_id: "editions_hero_start_project",
    cta_location: "editions_hero",
  },
  nocturne_final: {
    cta_id: "nocturne_final_start_project",
    cta_location: "nocturne_final_cta",
  },
  nocturne_hero: {
    cta_id: "nocturne_hero_start_project",
    cta_location: "nocturne_hero",
  },
} as const;

export function EditionViewTracker({ category, editionNumber, slug }: EditionViewTrackerProps) {
  const trackedSlug = useRef<string | null>(null);

  useEffect(() => {
    if (trackedSlug.current === slug) return;
    trackedSlug.current = slug;
    trackClient("edition_viewed", {
      edition_category: category,
      edition_number: editionNumber,
      edition_slug: slug,
    });
  }, [category, editionNumber, slug]);

  return null;
}

export function TrackedEditionStartLink({
  editionSlug,
  href,
  placement,
  ...props
}: TrackedEditionStartLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={() => {
        trackClient("start_project_clicked", {
          ...trackingByPlacement[placement],
          ...(editionSlug ? { edition_slug: editionSlug } : {}),
        });
      }}
    />
  );
}
