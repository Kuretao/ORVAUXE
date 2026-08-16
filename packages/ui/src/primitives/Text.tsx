import type { HTMLAttributes } from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  as?: "p" | "span";
}

export function Text({ as: Tag = "p", className, ...props }: TextProps) {
  return <Tag className={["orvauxe-text", className].filter(Boolean).join(" ")} {...props} />;
}
