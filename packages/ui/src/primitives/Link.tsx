import type { ComponentPropsWithRef } from "react";

type LinkVariant = "default" | "editorial" | "navigation" | "quiet";

export interface LinkProps extends ComponentPropsWithRef<"a"> {
  variant?: LinkVariant;
}

export function Link({ children, className, variant = "default", ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={["orvauxe-link", `orvauxe-link--${variant}`, className].filter(Boolean).join(" ")}
      data-variant={variant}
    >
      {children}
    </a>
  );
}
