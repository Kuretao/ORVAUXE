import type { ComponentPropsWithRef, ReactNode } from "react";

type MediaAspect = "auto" | "landscape" | "portrait" | "square";
type MediaFit = "cover" | "contain";

export interface MediaProps extends ComponentPropsWithRef<"figure"> {
  aspect?: MediaAspect;
  caption?: ReactNode;
  fit?: MediaFit;
}

export function Media({
  aspect = "auto",
  caption,
  children,
  className,
  fit = "cover",
  ...props
}: MediaProps) {
  return (
    <figure
      {...props}
      className={[
        "orvauxe-media",
        `orvauxe-media--${aspect}`,
        `orvauxe-media--fit-${fit}`,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      data-aspect={aspect}
      data-fit={fit}
    >
      {children}
      {caption !== undefined && caption !== null ? (
        <figcaption className="orvauxe-media__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
