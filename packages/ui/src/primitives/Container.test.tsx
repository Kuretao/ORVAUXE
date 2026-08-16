import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Container } from "./Container";

describe("Container", () => {
  it("encodes the selected semantic width and preserves consumer attributes", () => {
    render(<Container aria-label="Editorial copy" className="edition-copy" variant="editorial" />);

    const container = screen.getByLabelText("Editorial copy");
    expect(container).toHaveAttribute("data-container", "editorial");
    expect(container).toHaveClass(
      "orvauxe-container",
      "orvauxe-container--editorial",
      "edition-copy",
    );
  });

  it("uses the page contract by default", () => {
    render(<Container data-testid="container" />);

    expect(screen.getByTestId("container")).toHaveAttribute("data-container", "page");
  });
});
