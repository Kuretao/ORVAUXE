import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "./Button";

describe("Button", () => {
  it("renders a named native button and handles activation", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);

    const button = screen.getByRole("button", { name: "Continue" });
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("data-variant", "primary");
    expect(button).toHaveAttribute("data-size", "md");

    await userEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("preserves native disabled behavior", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Send inquiry
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Send inquiry" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("data-disabled");

    await userEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("exposes the selected visual contract without losing consumer classes", () => {
    render(
      <Button className="project-action" size="lg" variant="inverse">
        Begin a project
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Begin a project" })).toHaveClass(
      "orvauxe-button",
      "orvauxe-button--inverse",
      "orvauxe-button--lg",
      "project-action",
    );
  });
});
