import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Heading } from "./Heading";

describe("Heading", () => {
  it("separates the semantic element override from its visual variant", () => {
    render(
      <Heading as="h1" variant="display-lg">
        Commerce atelier
      </Heading>,
    );

    const heading = screen.getByRole("heading", { level: 1, name: "Commerce atelier" });
    expect(heading).toHaveAttribute("data-variant", "display-lg");
    expect(heading).toHaveClass("orvauxe-heading--display-lg");
  });

  it("derives a restrained visual default from the semantic level", () => {
    render(<Heading level={3}>Selected works</Heading>);

    expect(screen.getByRole("heading", { level: 3 })).toHaveAttribute("data-variant", "heading-md");
  });
});
