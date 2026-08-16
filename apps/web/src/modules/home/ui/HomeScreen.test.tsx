// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { homePageFallback } from "../data/home-page.fallback";
import type { HomeMedia, HomePageData } from "../model/home-page";
import { HomeScreen } from "./HomeScreen";

const trackClient = vi.hoisted(() => vi.fn());

vi.mock("@orvauxe/analytics/client", () => ({ trackClient }));

vi.mock("next/image", () => ({
  default: ({
    fill: _fill,
    priority: _priority,
    unoptimized: _unoptimized,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    unoptimized?: boolean;
  }) => {
    void _fill;
    void _priority;
    void _unoptimized;
    return createElement("img", props);
  },
}));

afterEach(() => {
  cleanup();
  trackClient.mockClear();
});

const editorialMedia: HomeMedia = {
  src: "https://cdn.sanity.io/images/example/production/editorial.jpg",
  alt: "Abstract folded textile study",
  decorative: false,
  width: 1800,
  height: 1200,
  objectPosition: "42% 55%",
  caption: "Material and light study.",
  credit: "ORVAUXE art direction.",
};

const editionMedia: HomeMedia = {
  src: "https://cdn.sanity.io/images/example/production/edition.jpg",
  alt: "Monochrome Edition composition",
  decorative: false,
  width: 1200,
  height: 1500,
  objectPosition: "50% 38%",
  caption: "Edition composition study.",
  credit: null,
};

const cmsPage: HomePageData = {
  ...homePageFallback,
  contentSource: "sanity",
  hero: {
    ...homePageFallback.hero,
    eyebrow: "CMS-authored studio introduction",
  },
  editorialMedia,
  editions: {
    ...homePageFallback.editions,
    featured: {
      ...homePageFallback.editions.featured,
      name: "Aperture",
      statusLabel: "ORVAUXE Original",
      copy: "CMS-authored Edition copy.",
      media: editionMedia,
    },
  },
};

describe("HomeScreen", () => {
  it("server-renders the complete fallback narrative as one skip-link target", () => {
    const markup = renderToStaticMarkup(<HomeScreen page={homePageFallback} />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('data-content-source="fallback"');
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain("Commerce for the distinctive.");
    expect(markup).toContain("Temporary media");
  });

  it("exposes one H1, named narrative regions, truthful links, and the featured article", () => {
    render(<HomeScreen page={homePageFallback} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Commerce for the distinctive." }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("region", {
        name: "Built to be desired. Designed to be bought.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Editions" })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Nocturne" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Atelier" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "ORVAUXE" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Have a brand worth building for?" }),
    ).toBeInTheDocument();

    for (const link of screen.getAllByRole("link", { name: "Start a Project" })) {
      expect(link).toHaveAttribute("href", "/start-a-project");
    }
    for (const link of screen.getAllByRole("link", { name: "Explore Editions" })) {
      expect(link).toHaveAttribute("href", "/editions");
    }
    expect(screen.getByRole("link", { name: "Discover Atelier" })).toHaveAttribute(
      "href",
      "/atelier",
    );
    expect(document.querySelector('a[href="/editions/nocturne"]')).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /work|journal/i })).not.toBeInTheDocument();
  });

  it("renders CMS-shaped copy and media with lazy responsive image semantics", () => {
    render(<HomeScreen page={cmsPage} />);

    expect(screen.getByRole("main")).toHaveAttribute("data-content-source", "sanity");
    expect(screen.getByText("CMS-authored studio introduction")).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Aperture" })).toBeInTheDocument();
    expect(screen.getByText("CMS-authored Edition copy.")).toBeInTheDocument();

    const editorial = screen.getByRole("img", { name: editorialMedia.alt });
    expect(editorial).toHaveAttribute("loading", "lazy");
    expect(editorial).toHaveAttribute("sizes", "100vw");
    expect(editorial).toHaveStyle({ objectPosition: editorialMedia.objectPosition });
    expect(screen.getByText("Material and light study.")).toBeInTheDocument();
    expect(screen.getByText("ORVAUXE art direction.")).toBeInTheDocument();

    const featuredArticle = screen.getByRole("article", { name: "Aperture" });
    const featuredImage = within(featuredArticle).getByRole("img", { name: editionMedia.alt });
    expect(featuredImage).toHaveAttribute("loading", "lazy");
    expect(featuredImage).toHaveAttribute(
      "sizes",
      "(min-width: 96rem) 60rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62.5vw, 100vw",
    );
  });

  it("emits only the approved start-project events without blocking links", () => {
    render(<HomeScreen page={homePageFallback} />);

    const startProjectLinks = screen.getAllByRole("link", { name: "Start a Project" });
    for (const link of startProjectLinks) {
      link.addEventListener("click", (event) => event.preventDefault(), { once: true });
      fireEvent.click(link);
    }

    expect(trackClient).toHaveBeenNthCalledWith(1, "start_project_clicked", {
      cta_id: "home_hero_start_project",
      cta_location: "home_hero",
    });
    expect(trackClient).toHaveBeenNthCalledWith(2, "start_project_clicked", {
      cta_id: "home_final_start_project",
      cta_location: "home_final_cta",
    });
    expect(trackClient).toHaveBeenCalledTimes(2);
  });
});
