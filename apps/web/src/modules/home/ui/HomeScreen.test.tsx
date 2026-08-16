// @vitest-environment jsdom

import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { createElement } from "react";
import type { ImgHTMLAttributes } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import { homePageFallback } from "../data/home-page.fallback";
import type { HomeMedia, HomePageData } from "../model/home-page";
import { HomeScreen } from "./HomeScreen";

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

const heroMedia: HomeMedia = {
  src: "https://cdn.sanity.io/images/example/production/hero.jpg",
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
  heroMedia,
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
  it("server-renders the initial campaign and complete fallback narrative", () => {
    const markup = renderToStaticMarkup(<HomeScreen page={homePageFallback} />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('data-content-source="fallback"');
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain("Commerce for the distinctive.");
    expect(markup).toContain("01 / 03");
    expect(markup).not.toContain("Temporary media");
    expect(markup).not.toContain("final Edition imagery pending");
  });

  it("keeps one H1, commercial clarity, named sections, and truthful destination links", () => {
    render(<HomeScreen page={homePageFallback} />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Commerce for the distinctive." }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Commerce Atelier").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Chengdu · Worldwide").length).toBeGreaterThan(0);
    expect(screen.getByText(/Premium Shopify storefronts/)).toBeInTheDocument();

    const destinations = screen.getByRole("navigation", { name: "Homepage destinations" });
    expect(within(destinations).getByRole("link", { name: /Editions/ })).toHaveAttribute(
      "href",
      "/editions",
    );
    expect(within(destinations).getByRole("link", { name: /Atelier/ })).toHaveAttribute(
      "href",
      "/atelier",
    );
    expect(within(destinations).getByRole("link", { name: /Nocturne/ })).toHaveAttribute(
      "href",
      "/editions",
    );
    expect(within(destinations).getByRole("link", { name: /Studio/ })).toHaveAttribute(
      "href",
      "/studio",
    );

    expect(
      screen.getByRole("region", { name: "Built to be desired. Designed to be bought." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Editions" })).toBeInTheDocument();
    expect(screen.getByRole("article", { name: "Nocturne" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Atelier" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "ORVAUXE" })).toBeInTheDocument();
    expect(
      screen.getByRole("region", { name: "Have a brand worth building for?" }),
    ).toBeInTheDocument();
    expect(document.querySelector('a[href="/editions/nocturne"]')).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /work|journal/i })).not.toBeInTheDocument();
  });

  it("loads only the initial state eagerly and wraps manual navigation with focus retained", () => {
    render(<HomeScreen page={homePageFallback} />);

    const campaign = screen.getByRole("region", { name: "Commerce for the distinctive." });
    const initialImage = within(campaign).getByRole("img", {
      name: "Black tailoring, ivory silk and brushed metal material study.",
    });
    expect(initialImage).toHaveAttribute("loading", "eager");
    expect(initialImage).toHaveAttribute("fetchpriority", "high");
    expect(initialImage).toHaveAttribute("sizes", "100vw");

    const next = within(campaign).getByRole("button", { name: "Next campaign state" });
    next.focus();
    fireEvent.click(next);
    expect(next).toHaveFocus();
    expect(campaign).toHaveAttribute("data-campaign-state", "nocturne");
    expect(within(campaign).getByText("02 / 03", { exact: true })).toBeInTheDocument();
    expect(
      within(campaign).getByRole("img", {
        name: "Black leather, brushed metal and smoked glass material study.",
      }),
    ).toHaveAttribute("loading", "lazy");

    fireEvent.click(next);
    expect(
      within(campaign).getByText(/For brands requiring something entirely their own\./),
    ).toBeInTheDocument();
    expect(within(campaign).getByText("03 / 03", { exact: true })).toBeInTheDocument();
    fireEvent.click(next);
    expect(within(campaign).getByText("01 / 03", { exact: true })).toBeInTheDocument();

    const previous = within(campaign).getByRole("button", { name: "Previous campaign state" });
    fireEvent.click(previous);
    expect(within(campaign).getByText("03 / 03", { exact: true })).toBeInTheDocument();
  });

  it("keeps panel previews transient, pointer-specific, and separate from link focus", () => {
    render(<HomeScreen page={homePageFallback} />);

    const campaign = screen.getByRole("region", { name: "Commerce for the distinctive." });
    const atelier = within(campaign).getByRole("link", { name: /Atelier/ });

    fireEvent.pointerEnter(atelier, { pointerType: "mouse" });
    expect(
      within(campaign).getByText(/For brands requiring something entirely their own\./),
    ).toBeInTheDocument();
    fireEvent.pointerLeave(atelier);
    expect(within(campaign).getByText("Commerce for the distinctive.")).toBeInTheDocument();

    fireEvent.pointerEnter(atelier, { pointerType: "touch" });
    expect(within(campaign).getByText("Commerce for the distinctive.")).toBeInTheDocument();
    fireEvent.focus(atelier);
    expect(within(campaign).getByText("Commerce for the distinctive.")).toBeInTheDocument();
  });

  it("renders CMS media through the same campaign and preserves featured captions", () => {
    render(<HomeScreen page={cmsPage} />);

    expect(screen.getByRole("main")).toHaveAttribute("data-content-source", "sanity");
    expect(screen.getAllByText("ORVAUXE").length).toBeGreaterThan(0);
    expect(screen.getByRole("article", { name: "Aperture" })).toBeInTheDocument();
    expect(screen.getByText("CMS-authored Edition copy.")).toBeInTheDocument();

    const campaignImage = screen.getByRole("img", { name: heroMedia.alt });
    expect(campaignImage).toHaveAttribute("loading", "eager");
    expect(campaignImage).toHaveAttribute("sizes", "100vw");
    expect(campaignImage).toHaveStyle({ objectPosition: heroMedia.objectPosition });
    expect(screen.queryByText("Material and light study.")).not.toBeInTheDocument();

    const featuredArticle = screen.getByRole("article", { name: "Aperture" });
    const featuredImage = within(featuredArticle).getByRole("img", { name: editionMedia.alt });
    expect(featuredImage).toHaveAttribute("loading", "lazy");
    expect(featuredImage).toHaveAttribute(
      "sizes",
      "(min-width: 96rem) 60rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62.5vw, 100vw",
    );
    expect(within(featuredArticle).getByText("Edition composition study.")).toBeInTheDocument();
  });

  it("emits only the two approved start-project events", () => {
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
