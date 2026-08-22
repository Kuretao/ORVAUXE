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
    for (const capability of ["Next.js", "Laravel", "Payments / checkout", "Fiscal commerce"]) {
      expect(within(proof).getByText(capability)).toBeInTheDocument();
    }
    expect(proof).toHaveTextContent(/anonymous technical proof/i);
    expect(proof).not.toHaveTextContent(/client quote|conversion|revenue|GMV|order count/i);
  });
});
