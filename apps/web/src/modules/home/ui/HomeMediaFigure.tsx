import { Media } from "@orvauxe/ui";
import Image from "next/image";
import type { ReactNode } from "react";

import type { HomeMedia } from "../model/home-page";
import styles from "./Home.module.css";

interface HomeMediaFigureProps {
  media: HomeMedia | null;
}

const placeholder = {
  alt: "Black leather, brushed metal and smoked glass material study.",
  sizes: "(min-width: 96rem) 60rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62.5vw, 100vw",
  src: "/media/home-campaign-nocturne-temporary.webp",
} as const;

function mediaCaption(media: HomeMedia | null): ReactNode {
  if (!media) return null;
  if (!media.caption && !media.credit) return null;

  return (
    <>
      {media.caption ? <span>{media.caption}</span> : null}
      {media.credit ? <span className={styles.mediaCredit}>{media.credit}</span> : null}
    </>
  );
}

export function HomeMediaFigure({ media }: HomeMediaFigureProps) {
  const alt = media ? (media.decorative ? "" : media.alt) : placeholder.alt;

  return (
    <Media aspect="auto" caption={mediaCaption(media)} className={styles.editionMedia}>
      <div className={styles.editionMediaFrame} data-placeholder={media ? undefined : "temporary"}>
        <Image
          alt={alt}
          fill
          loading="lazy"
          sizes={placeholder.sizes}
          src={media?.src ?? placeholder.src}
          style={{ objectPosition: media?.objectPosition ?? "50% 50%" }}
        />
      </div>
    </Media>
  );
}
