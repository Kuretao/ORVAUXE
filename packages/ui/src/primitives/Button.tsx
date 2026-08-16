import type { ButtonHTMLAttributes } from "react";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  const classes = ["orvauxe-button", className].filter(Boolean).join(" ");
  return <button className={classes} type={type} {...props} />;
}
