import { Media } from "@orvauxe/ui";
import Image from "next/image";
import type { ReactNode } from "react";

import type { HomeMedia } from "../model/home-page";
import styles from "./Home.module.css";

type HomeMediaVariant = "editorial" | "featured-edition";

interface HomeMediaFigureProps {
  media: HomeMedia | null;
  variant: HomeMediaVariant;
}

const placeholderByVariant: Record<
  HomeMediaVariant,
  { caption: string; sizes: string; src: string }
> = {
  editorial: {
    caption: "Temporary media — production photography pending.",
    sizes: "100vw",
    src: "/media/home-editorial-temporary.png",
  },
  "featured-edition": {
    caption: "Temporary concept media — final Edition imagery pending.",
    sizes: "(min-width: 96rem) 60rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62.5vw, 100vw",
    src: "/media/home-edition-concept-temporary.png",
  },
};

function mediaCaption(media: HomeMedia | null, placeholderCaption: string): ReactNode {
  if (!media) return placeholderCaption;
  if (!media.caption && !media.credit) return null;

  return (
    <>
      {media.caption ? <span>{media.caption}</span> : null}
      {media.credit ? <span className={styles.mediaCredit}>{media.credit}</span> : null}
    </>
  );
}

export function HomeMediaFigure({ media, variant }: HomeMediaFigureProps) {
  const placeholder = placeholderByVariant[variant];
  const alt = media && !media.decorative ? media.alt : "";

  return (
    <Media
      aspect="auto"
      caption={mediaCaption(media, placeholder.caption)}
      className={variant === "editorial" ? styles.editorialMedia : styles.editionMedia}
    >
      <div
        className={variant === "editorial" ? styles.editorialMediaFrame : styles.editionMediaFrame}
        data-placeholder={media ? undefined : "temporary"}
      >
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
