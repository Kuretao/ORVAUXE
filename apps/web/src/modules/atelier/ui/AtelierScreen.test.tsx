// @vitest-environment jsdom

import "@testing-library/jest-dom/vitest";

import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { atelierPageFallback } from "../model/atelier-page";
import { AtelierScreen } from "./AtelierScreen";

vi.mock("@orvauxe/analytics/client", () => ({ trackClient: vi.fn() }));
afterEach(cleanup);

describe("AtelierScreen", () => {
  it("renders the complete bespoke-commerce narrative without a route skeleton", () => {
    render(<AtelierScreen page={atelierPageFallback} />);

    expect(
      screen.getByRole("heading", { level: 1, name: /Commerce, built around the brand/i }),
    ).toBeInTheDocument();
    expect(screen.getByText("From $6,000")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "The system follows the brief." }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(12);
    expect(screen.getByRole("link", { name: "Build with the Atelier" })).toHaveAttribute(
      "href",
      "/start-a-project",
    );
    expect(screen.queryByText(/not configured|skeleton/i)).not.toBeInTheDocument();
  });

  it("keeps the process concise and does not invent a delivery timeline", () => {
    render(<AtelierScreen page={atelierPageFallback} />);

    const process = screen.getByRole("region", { name: "From direction to launch." });
    expect(within(process).getAllByRole("listitem")).toHaveLength(6);
    expect(process).not.toHaveTextContent(/business days|weeks/i);
  });
});
