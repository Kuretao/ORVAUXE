import type { AnchorHTMLAttributes } from "react";

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export function Link({ children, className, ...props }: LinkProps) {
  return (
    <a className={["orvauxe-link", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </a>
  );
}
