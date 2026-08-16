import type { HTMLAttributes } from "react";

export function FocusRing({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={["orvauxe-focus-ring", className].filter(Boolean).join(" ")} {...props} />
  );
}
