import type { HTMLAttributes } from "react";

export function Grid({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["orvauxe-grid", className].filter(Boolean).join(" ")} {...props} />;
}
