import type { ComponentPropsWithRef } from "react";

type GridGap = "default" | "none";

export interface GridProps extends ComponentPropsWithRef<"div"> {
  gap?: GridGap;
}

export function Grid({ className, gap = "default", ...props }: GridProps) {
  return (
    <div
      {...props}
      className={["orvauxe-grid", `orvauxe-grid--gap-${gap}`, className].filter(Boolean).join(" ")}
      data-columns="4-8-12"
      data-gap={gap}
    />
  );
}
