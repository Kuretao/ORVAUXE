import type { ComponentPropsWithRef } from "react";

export type FocusRingProps = ComponentPropsWithRef<"span">;

export function FocusRing({ className, ...props }: FocusRingProps) {
  return (
    <span {...props} className={["orvauxe-focus-ring", className].filter(Boolean).join(" ")} />
  );
}
