import type { HTMLAttributes } from "react";

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={["orvauxe-container", className].filter(Boolean).join(" ")} {...props} />;
}
