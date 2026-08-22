// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { studioPageFallback } from "../model/studio-page";
import { StudioScreen } from "./StudioScreen";

vi.mock("@orvauxe/analytics/client", () => ({ trackClient: vi.fn() }));
afterEach(cleanup);

describe("StudioScreen", () => {
  it("renders the complete independent-studio narrative", () => {
    render(<StudioScreen page={studioPageFallback} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Independent commerce atelier/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Chengdu · Worldwide").length).toBeGreaterThan(0);
    expect(screen.getByRole("heading", { name: "Retail Commerce Platform" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/start-a-project",
    );
  });

  it("frames the verified retail work anonymously as engineering proof", () => {
    render(<StudioScreen page={studioPageFallback} />);

    const proof = screen.getByRole("region", { name: "Retail Commerce Platform" });
    for (const capability of [
      "Next.js",
      "Laravel",
      "Payments / checkout",
      "Receipt / fiscal support",
    ]) {
      expect(within(proof).getByText(capability)).toBeInTheDocument();
    }
    expect(proof).toHaveTextContent(/payment handling and fiscal receipt support/i);
    expect(proof).not.toHaveTextContent(/fiscal commerce/i);
    expect(proof).toHaveTextContent(/anonymous technical proof/i);
    expect(proof).not.toHaveTextContent(/client quote|conversion|revenue|GMV|order count/i);
  });

  it("tightens a legacy CMS fiscal-commerce phrase before public rendering", () => {
    render(
      <StudioScreen
        page={{
          ...studioPageFallback,
          contentSource: "sanity",
          trustContent: "Checkout, payments and fiscal commerce integration.",
        }}
      />,
    );

    expect(screen.getByText(/checkout, payments and fiscal receipt support/i)).toBeInTheDocument();
    expect(screen.queryByText(/fiscal commerce/i)).not.toBeInTheDocument();
  });
});
