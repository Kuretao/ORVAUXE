import type { ComponentPropsWithRef } from "react";

type ContainerVariant = "page" | "editorial" | "text" | "full-bleed";

export interface ContainerProps extends ComponentPropsWithRef<"div"> {
  variant?: ContainerVariant;
}

export function Container({ className, variant = "page", ...props }: ContainerProps) {
  return (
    <div
      {...props}
      className={["orvauxe-container", `orvauxe-container--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      data-container={variant}
    />
  );
}
