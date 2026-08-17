// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { nocturneEditionFallback } from "../data/edition.fallback";
import { EditionViewTracker } from "./EditionAnalytics.client";
import { EditionIndexScreen } from "./EditionIndexScreen";
import { NocturneEditionScreen } from "./NocturneEditionScreen";

const trackClient = vi.hoisted(() => vi.fn());

vi.mock("@orvauxe/analytics/client", () => ({ trackClient }));

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean }) => {
    void _fill;
    return createElement("img", props);
  },
}));

afterEach(() => {
  cleanup();
  trackClient.mockClear();
});

describe("Edition screens", () => {
  it("server-renders the catalogue and Nocturne product essentials", () => {
    const indexMarkup = renderToStaticMarkup(
      <EditionIndexScreen editions={[nocturneEditionFallback]} />,
    );
    const nocturneMarkup = renderToStaticMarkup(
      <NocturneEditionScreen edition={nocturneEditionFallback} />,
    );

    expect(indexMarkup).toContain('id="main-content"');
    expect(indexMarkup.match(/<h1\b/g)).toHaveLength(1);
    expect(indexMarkup).toContain("Curated commerce, ready to become yours.");
    expect(indexMarkup).toContain("Native responsive Shopify theme");
    expect(indexMarkup).toContain('href="/editions/nocturne"');

    expect(nocturneMarkup).toContain('id="main-content"');
    expect(nocturneMarkup.match(/<h1\b/g)).toHaveLength(1);
    expect(nocturneMarkup).toContain("A fashion storefront built in shadow and structure.");
    expect(nocturneMarkup).toContain("ORVAUXE Original");
    expect(nocturneMarkup).toContain("Concept Edition");
    expect(nocturneMarkup).toContain('href="/start-a-project?edition=nocturne"');
    for (const view of ["home", "collection", "product", "mobile"]) {
      expect(nocturneMarkup).toContain(`data-storefront-view="${view}"`);
    }
    expect(nocturneMarkup).not.toMatch(/\b(?:client|case study|results)\b/i);
  });

  it("tracks an Edition view once for each route slug", () => {
    const { rerender } = render(
      <EditionViewTracker category="Fashion / Accessories" editionNumber={1} slug="nocturne" />,
    );

    expect(trackClient).toHaveBeenCalledTimes(1);
    expect(trackClient).toHaveBeenLastCalledWith("edition_viewed", {
      edition_category: "Fashion / Accessories",
      edition_number: 1,
      edition_slug: "nocturne",
    });

    rerender(
      <EditionViewTracker category="Fashion / Accessories" editionNumber={1} slug="nocturne" />,
    );
    expect(trackClient).toHaveBeenCalledTimes(1);

    rerender(<EditionViewTracker category="Design" editionNumber={2} slug="second-edition" />);
    expect(trackClient).toHaveBeenCalledTimes(2);
    expect(trackClient).toHaveBeenLastCalledWith("edition_viewed", {
      edition_category: "Design",
      edition_number: 2,
      edition_slug: "second-edition",
    });
  });

  it("tracks the Nocturne CTA with its typed placement payload", () => {
    render(<NocturneEditionScreen edition={nocturneEditionFallback} />);
    trackClient.mockClear();

    const cta = screen.getAllByRole("link", { name: "Start with Nocturne" })[0];
    if (!cta) throw new Error("Nocturne CTA was not rendered.");
    cta.addEventListener("click", (event) => event.preventDefault(), { once: true });
    fireEvent.click(cta);

    expect(trackClient).toHaveBeenCalledTimes(1);
    expect(trackClient).toHaveBeenCalledWith("start_project_clicked", {
      cta_id: "nocturne_hero_start_project",
      cta_location: "nocturne_hero",
      edition_slug: "nocturne",
    });
  });
});
