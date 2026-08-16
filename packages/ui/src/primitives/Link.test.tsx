import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Link } from "./Link";

describe("Link", () => {
  it("renders a framework-independent semantic anchor", () => {
    render(
      <Link href="/editions" variant="navigation">
        Editions
      </Link>,
    );

    const link = screen.getByRole("link", { name: "Editions" });
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/editions");
    expect(link).toHaveAttribute("data-variant", "navigation");
    expect(link).toHaveClass("orvauxe-link", "orvauxe-link--navigation");
  });
});
