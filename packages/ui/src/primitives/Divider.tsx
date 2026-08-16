import type { ComponentPropsWithRef } from "react";

type DividerTone = "subtle" | "strong";

export interface DividerProps extends ComponentPropsWithRef<"hr"> {
  tone?: DividerTone;
}

export function Divider({ className, tone = "subtle", ...props }: DividerProps) {
  return (
    <hr
      {...props}
      className={["orvauxe-divider", `orvauxe-divider--${tone}`, className]
        .filter(Boolean)
        .join(" ")}
      data-tone={tone}
    />
  );
}
