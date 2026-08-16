import type { HTMLAttributes, ReactNode } from "react";

export interface MediaProps extends HTMLAttributes<HTMLElement> {
  caption?: ReactNode;
}

export function Media({ caption, children, className, ...props }: MediaProps) {
  return (
    <figure className={["orvauxe-media", className].filter(Boolean).join(" ")} {...props}>
      {children}
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
