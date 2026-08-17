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
      copy: "CMS-authored Edition copy.",
      media: editionMedia,
      storefrontViews: homePageFallback.editions.featured.storefrontViews.map((view) => ({
        ...view,
        media: editionMedia,
      })),
    },
  },
};

const expectedSectionLabels = [
  "home-campaign-heading",
  "home-statement-heading",
  "home-what-we-build-heading",
  "home-editions-heading",
  "home-nocturne-heading",
  "home-storefront-system-heading",
  "home-atelier-heading",
  "home-process-heading",
  "home-studio-heading",
  "home-project-cta-heading",
] as const;

describe("HomeScreen", () => {
  it("server-renders the initial campaign and complete fallback narrative", () => {
    const markup = renderToStaticMarkup(<HomeScreen page={homePageFallback} />);

    expect(markup).toContain('id="main-content"');
    expect(markup).toContain('data-content-source="fallback"');
    expect(markup).toContain('data-storefront-context="homepage-v1-2"');
    expect(markup.match(/<h1\b/g)).toHaveLength(1);
    expect(markup).toContain("Commerce for the distinctive.");
    expect(markup).toContain("Commerce shaped around the brand.");
    expect(markup).toContain("A complete storefront system.");
    expect(markup).toContain("From direction to launch.");
    expect(markup).toContain("01 / 03");
    expect(markup).not.toContain("Temporary media");
    expect(markup).not.toContain("final Edition imagery pending");
  });

  it("keeps one H1 and server-renders the complete ten-part commercial narrative", () => {
    render(<HomeScreen page={homePageFallback} />);

    const main = screen.getByRole("main");
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(
      screen.getByRole("heading", { level: 1, name: "Commerce for the distinctive." }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Commerce Atelier").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Chengdu · Worldwide").length).toBeGreaterThan(0);
    expect(screen.getByText(/Premium Shopify storefronts/)).toBeInTheDocument();

    expect(Array.from(main.children, (element) => element.getAttribute("aria-labelledby"))).toEqual(
      expectedSectionLabels,
    );

    for (const name of [
      "Built to be desired. Designed to be bought.",
      "Commerce shaped around the brand.",
      "Editions",
      "Nocturne",
      "A complete storefront system.",
      "Atelier",
      "From direction to launch.",
      "ORVAUXE",
      "Have a brand worth building for?",
    ]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
  });

  it("shows product proof, Edition scope, process, and truthful routes without agency filler", () => {
    render(<HomeScreen page={homePageFallback} />);

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

    const whatWeBuild = screen.getByRole("region", {
      name: "Commerce shaped around the brand.",
    });
    const signals = within(whatWeBuild).getByRole("list", {
      name: "Core storefront capabilities",
    });
    expect(within(signals).getAllByRole("listitem")).toHaveLength(3);
    for (const signal of ["Brand-led UX", "Commerce architecture", "Shopify implementation"]) {
      expect(within(signals).getByText(signal)).toBeInTheDocument();
    }

    const productProofPreviews = within(whatWeBuild).getAllByRole("img");
    expect(productProofPreviews).toHaveLength(2);
    expect(productProofPreviews[0]).toHaveAccessibleName(/storefront preview, home view/i);
    expect(productProofPreviews[1]).toHaveAccessibleName(/storefront preview, mobile view/i);

    const productProofImages = Array.from(whatWeBuild.querySelectorAll("img"));
    expect(productProofImages).toHaveLength(2);
    expect(productProofImages[0]).toHaveAttribute("alt", "");
    expect(productProofImages[0]).toHaveAttribute("loading", "lazy");
    expect(productProofImages[0]).toHaveAttribute(
      "sizes",
      "(min-width: 96rem) 67rem, (min-width: 64rem) 72vw, (min-width: 48rem) 75vw, 100vw",
    );
    expect(productProofImages[1]).toHaveAttribute("alt", "");
    expect(productProofImages[1]).toHaveAttribute("loading", "lazy");
    expect(productProofImages[1]).toHaveAttribute(
      "sizes",
      "(min-width: 96rem) 18rem, (min-width: 64rem) 18vw, (min-width: 48rem) 26vw, 40vw",
    );

    const editions = screen.getByRole("region", { name: "Editions" });
    expect(within(editions).getByText(/Curated premium storefront systems/)).toBeInTheDocument();
    expect(within(editions).getByRole("link", { name: "Explore Editions" })).toHaveAttribute(
      "href",
      "/editions",
    );
    expect(screen.getAllByText("From $2,490", { exact: true })).toHaveLength(1);

    const nocturne = screen.getByRole("region", { name: "Nocturne" });
    expect(within(nocturne).getByText("04 / Edition 001", { exact: true })).toBeInTheDocument();
    expect(within(nocturne).getByText("Fashion", { exact: true })).toBeInTheDocument();
    expect(
      within(nocturne).getByText("Concept Edition / ORVAUXE Original", { exact: true }),
    ).toBeInTheDocument();
    expect(within(nocturne).getByText("Shopify", { exact: true })).toBeInTheDocument();
    expect(within(nocturne).getByRole("link", { name: "Explore Editions" })).toHaveAttribute(
      "href",
      "/editions",
    );
    for (const image of nocturne.querySelectorAll("img")) {
      expect(image).toHaveAttribute("loading", "lazy");
      expect(image.getAttribute("sizes")).toBeTruthy();
    }

    const system = screen.getByRole("region", { name: "A complete storefront system." });
    const systemLists = within(system).getAllByRole("list", {
      name: "Included storefront views",
    });
    expect(systemLists).toHaveLength(2);
    for (const list of systemLists) {
      expect(within(list).getAllByRole("listitem")).toHaveLength(6);
    }
    for (const image of system.querySelectorAll("img")) {
      expect(Number(image.getAttribute("height"))).toBeGreaterThan(0);
      expect(Number(image.getAttribute("width"))).toBeGreaterThan(0);
    }
    for (const stage of ["Home", "Collection", "Product", "Cart", "Editorial", "Mobile"]) {
      expect(within(system).getAllByText(stage, { exact: true })).toHaveLength(2);
    }

    const atelier = screen.getByRole("region", { name: "Atelier" });
    expect(within(atelier).getByRole("link", { name: "Discover Atelier" })).toHaveAttribute(
      "href",
      "/atelier",
    );
    expect(within(atelier).getAllByRole("listitem")).toHaveLength(6);

    const process = screen.getByRole("region", { name: "From direction to launch." });
    expect(within(process).getAllByRole("listitem")).toHaveLength(4);
    for (const stage of ["Direction", "Adaptation", "Build", "Launch"]) {
      expect(within(process).getByRole("heading", { level: 3, name: stage })).toBeInTheDocument();
    }

    const finalCta = screen.getByRole("region", { name: "Have a brand worth building for?" });
    expect(within(finalCta).getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/start-a-project",
    );

    expect(document.querySelector('a[href="/editions/nocturne"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href^="/work"]')).not.toBeInTheDocument();
    expect(document.querySelector('a[href^="/journal"]')).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /work|journal/i })).not.toBeInTheDocument();
    expect(
      screen.queryByText(
        /\b(?:temporary|placeholder|pending|fake|mock|dev|development|sample)\b|final asset pending|demo only/i,
      ),
    ).not.toBeInTheDocument();
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

  it("keeps the storefront-system island local, semantic, and manually controllable", () => {
    render(<HomeScreen page={homePageFallback} />);

    const system = screen.getByRole("region", { name: "A complete storefront system." });
    const state = system.querySelector("[data-system-state]");
    const buttons = within(system).getAllByRole("button");

    expect(state).toHaveAttribute("data-system-state", "home");
    expect(buttons).toHaveLength(6);
    expect(buttons[0]).toHaveAttribute("aria-pressed", "true");

    const product = within(system).getByRole("button", { name: /Product/ });
    fireEvent.click(product);

    expect(state).toHaveAttribute("data-system-state", "product");
    expect(product).toHaveAttribute("aria-pressed", "true");
    expect(system.querySelector('[data-storefront-view="product"]')).toBeInTheDocument();
    for (const label of ["Home", "Collection", "Product", "Cart", "Editorial", "Mobile"]) {
      expect(within(system).getAllByText(label, { exact: true })).toHaveLength(2);
    }
  });

  it("disconnects the storefront-system observer and media listener on unmount", () => {
    const disconnect = vi.fn();
    const observe = vi.fn();
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();
    const originalMatchMedia = Object.getOwnPropertyDescriptor(window, "matchMedia");

    const mediaQueryList = {
      addEventListener,
      addListener: vi.fn(),
      dispatchEvent: vi.fn(() => true),
      matches: true,
      media:
        "(min-width: 64rem) and (min-height: 50rem) and (prefers-reduced-motion: no-preference)",
      onchange: null,
      removeEventListener,
      removeListener: vi.fn(),
    } as MediaQueryList;

    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: vi.fn(() => mediaQueryList),
    });

    class IntersectionObserverStub implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly scrollMargin = "";
      readonly thresholds = [];

      disconnect() {
        disconnect();
      }

      observe() {
        observe();
      }

      takeRecords() {
        return [];
      }

      unobserve() {}
    }

    vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

    try {
      const { unmount } = render(<HomeScreen page={homePageFallback} />);

      expect(observe).toHaveBeenCalledTimes(6);
      expect(addEventListener).toHaveBeenCalledWith("change", expect.any(Function));

      unmount();

      expect(disconnect).toHaveBeenCalledTimes(1);
      expect(removeEventListener).toHaveBeenCalledWith("change", expect.any(Function));
    } finally {
      vi.unstubAllGlobals();
      if (originalMatchMedia) {
        Object.defineProperty(window, "matchMedia", originalMatchMedia);
      } else {
        Reflect.deleteProperty(window, "matchMedia");
      }
    }
  });

  it("renders CMS media through the campaign and reusable product-story views", () => {
    render(<HomeScreen page={cmsPage} />);

    expect(screen.getByRole("main")).toHaveAttribute("data-content-source", "sanity");
    expect(screen.getAllByText("ORVAUXE").length).toBeGreaterThan(0);
    expect(screen.getByRole("region", { name: "Nocturne" })).toBeInTheDocument();
    expect(screen.getByText("CMS-authored Edition copy.")).toBeInTheDocument();

    const campaignImage = screen.getByRole("img", { name: heroMedia.alt });
    expect(campaignImage).toHaveAttribute("loading", "eager");
    expect(campaignImage).toHaveAttribute("sizes", "100vw");
    expect(campaignImage).toHaveStyle({ objectPosition: heroMedia.objectPosition });
    expect(screen.queryByText("Material and light study.")).not.toBeInTheDocument();

    const featuredRegion = screen.getByRole("region", { name: "Nocturne" });
    const featuredImages = within(featuredRegion).getAllByRole("img", {
      name: editionMedia.alt,
    });
    expect(featuredImages.length).toBeGreaterThan(1);
    for (const featuredImage of featuredImages) {
      expect(featuredImage).toHaveAttribute("loading", "lazy");
      expect(featuredImage).toHaveStyle({ objectPosition: editionMedia.objectPosition });
      expect(featuredImage.getAttribute("sizes")).toBeTruthy();
    }
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
