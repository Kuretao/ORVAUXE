import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Grid } from "./Grid";

describe("Grid", () => {
  it("owns the fixed mobile, tablet and desktop column contract", () => {
    render(<Grid aria-label="Edition index" />);

    const grid = screen.getByLabelText("Edition index");
    expect(grid).toHaveAttribute("data-columns", "4-8-12");
    expect(grid).toHaveAttribute("data-gap", "default");
    expect(grid).toHaveClass("orvauxe-grid", "orvauxe-grid--gap-default");
  });

  it("allows the deliberate gap-free composition", () => {
    render(<Grid data-testid="grid" gap="none" />);

    expect(screen.getByTestId("grid")).toHaveClass("orvauxe-grid--gap-none");
  });
});
