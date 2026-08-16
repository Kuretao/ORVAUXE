import type { ComponentPropsWithRef } from "react";

type HeadingElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant =
  "display-xl" | "display-lg" | "heading-xl" | "heading-lg" | "heading-md" | "heading-sm";

type HeadingElementProps =
  { as?: never; level?: HeadingLevel } | { as: HeadingElement; level?: never };

export type HeadingProps = ComponentPropsWithRef<"h2"> &
  HeadingElementProps & {
    variant?: HeadingVariant;
  };

const defaultVariantByLevel: Record<HeadingLevel, HeadingVariant> = {
  1: "heading-xl",
  2: "heading-lg",
  3: "heading-md",
  4: "heading-sm",
  5: "heading-sm",
  6: "heading-sm",
};

export function Heading({ as, level = 2, className, variant, ...props }: HeadingProps) {
  const Tag = as ?? (`h${level}` as HeadingElement);
  const semanticLevel = Number(Tag.slice(1)) as HeadingLevel;
  const resolvedVariant = variant ?? defaultVariantByLevel[semanticLevel];

  return (
    <Tag
      {...props}
      className={["orvauxe-heading", `orvauxe-heading--${resolvedVariant}`, className]
        .filter(Boolean)
        .join(" ")}
      data-variant={resolvedVariant}
    />
  );
}
