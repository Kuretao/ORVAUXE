import type { ComponentPropsWithRef } from "react";

type ButtonVariant = "primary" | "secondary" | "quiet" | "inverse";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ComponentPropsWithRef<"button"> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  className,
  disabled = false,
  size = "md",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  const classes = [
    "orvauxe-button",
    `orvauxe-button--${variant}`,
    `orvauxe-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...props}
      className={classes}
      data-disabled={disabled ? "" : undefined}
      data-size={size}
      data-variant={variant}
      disabled={disabled}
      type={type}
    />
  );
}
