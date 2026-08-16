import type { ComponentPropsWithRef } from "react";

type TextVariant = "body-lg" | "body-md" | "body-sm" | "label" | "caption";

interface TextVisualProps {
  variant?: TextVariant;
}

type ParagraphTextProps = ComponentPropsWithRef<"p"> & TextVisualProps & { as?: "p" };
type SpanTextProps = ComponentPropsWithRef<"span"> & TextVisualProps & { as: "span" };

export type TextProps = ParagraphTextProps | SpanTextProps;

function textClasses(variant: TextVariant, className?: string) {
  return ["orvauxe-text", `orvauxe-text--${variant}`, className].filter(Boolean).join(" ");
}

export function Text(props: TextProps) {
  if (props.as === "span") {
    const { as, className, variant = "body-md", ...spanProps } = props;

    return (
      <span
        {...spanProps}
        className={textClasses(variant, className)}
        data-element={as}
        data-variant={variant}
      />
    );
  }

  const { as = "p", className, variant = "body-md", ...paragraphProps } = props;

  return (
    <p
      {...paragraphProps}
      className={textClasses(variant, className)}
      data-element={as}
      data-variant={variant}
    />
  );
}
