import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const requiredViewports = [
  { height: 812, width: 320 },
  { height: 812, width: 375 },
  { height: 1024, width: 768 },
  { height: 640, width: 1366 },
  { height: 900, width: 1440 },
  { height: 1080, width: 1920 },
] as const;

const productionRoutes = ["/editions", "/editions/nocturne"] as const;

const forbiddenClientClaims = [
  /\bcase study\b/i,
  /\bclient\b/i,
  /\bconversion increase\b/i,
  /\brevenue increase\b/i,
  /\bresults\b/i,
] as const;

async function expectTruthfulCommercialPage(page: Page): Promise<void> {
  const main = page.locator("main#main-content");
  const renderedText = await main.innerText();

  for (const forbiddenClaim of forbiddenClientClaims) {
    expect(renderedText).not.toMatch(forbiddenClaim);
  }

  await expect(main.locator('a[href^="/work"], a[href^="/journal"]')).toHaveCount(0);
  await expect(main.locator("del, s")).toHaveCount(0);
  expect(renderedText).not.toMatch(/original price|discount|only \d+ left|limited time/i);

  const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(structuredData.join(" ")).not.toMatch(
    /"@type"\s*:\s*"(?:Product|Review|AggregateRating)"/i,
  );
}

async function expectResponsiveDocument(page: Page, path: (typeof productionRoutes)[number]) {
  const response = await page.goto(path, { waitUntil: "networkidle" });

  expect(response?.status()).toBeLessThan(400);
  await expect(page.locator("main#main-content")).toBeVisible();
  await expect(page.locator("main")).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-skeleton-marker]")).toHaveCount(0);

  const composition = await page.evaluate(() => {
    const heading = document.querySelector<HTMLElement>("main#main-content h1");
    const headingRect = heading?.getBoundingClientRect();

    return {
      documentWidth: document.documentElement.scrollWidth,
      headingLeft: headingRect?.left ?? -1,
      headingRight: headingRect?.right ?? window.innerWidth + 1,
      viewportWidth: window.innerWidth,
    };
  });

  expect(composition.documentWidth).toBeLessThanOrEqual(composition.viewportWidth);
  expect(composition.headingLeft).toBeGreaterThanOrEqual(0);
  expect(composition.headingRight).toBeLessThanOrEqual(composition.viewportWidth);
}

test.describe("Editions product catalogue", () => {
  test("renders the production narrative and approved commercial markers", async ({ page }) => {
    await page.goto("/editions");
    const main = page.locator("main#main-content");

    await expect(
      main.getByRole("heading", { level: 1, name: "Curated commerce, ready to become yours." }),
    ).toBeVisible();
    for (const heading of [
      "A directed system, adapted to the brand.",
      "Edition 001 / Nocturne",
      "What an Edition includes.",
      "The system stays. Your brand enters.",
      "From Ready to Build to launch.",
      "Editions or Atelier.",
    ]) {
      await expect(main.getByRole("heading", { name: heading })).toBeVisible();
    }

    for (const marker of [
      "Edition 001",
      "Nocturne",
      "Fashion / Accessories",
      "Shopify",
      "From $2,490",
      "From $6,000",
    ]) {
      await expect(main.getByText(marker, { exact: true }).first()).toBeVisible();
    }
    await expect(
      main.getByText(/7\u201310 business days from Ready to Build/).first(),
    ).toBeVisible();

    await expect(main.getByRole("link", { name: /Explore Nocturne/i }).first()).toHaveAttribute(
      "href",
      "/editions/nocturne",
    );
    await expect(main.getByRole("link", { name: /Start a Project/i }).first()).toHaveAttribute(
      "href",
      "/start-a-project",
    );
    await expectTruthfulCommercialPage(page);
  });

  test("publishes truthful index metadata", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Metadata needs one browser project.");

    await page.goto("/editions");

    await expect(page).toHaveTitle("Premium Shopify Editions | ORVAUXE");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /premium Shopify storefront systems/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/editions$/);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", /\/editions$/);
  });
});

test.describe("Nocturne Edition 001", () => {
  test("renders the concept product without case-study claims", async ({ page }) => {
    await page.goto("/editions/nocturne");
    const main = page.locator("main#main-content");

    await expect(main.getByRole("heading", { level: 1, name: "Nocturne" })).toBeVisible();
    for (const heading of [
      "A fashion storefront built in shadow and structure.",
      "The storefront experience.",
      "What remains Nocturne.",
      "What can change.",
    ]) {
      await expect(main.getByRole("heading", { name: heading })).toBeVisible();
    }

    for (const marker of ["Fashion / Accessories", "Shopify", "Concept Edition", "From $2,490"]) {
      await expect(main.getByText(marker, { exact: true }).first()).toBeVisible();
    }
    await expect(main.getByText(/Edition 001.*ORVAUXE Original/).first()).toBeVisible();
    for (const view of ["home", "collection", "product", "mobile"]) {
      await expect(main.locator(`[data-storefront-view="${view}"]`).first()).toBeVisible();
    }

    const storefrontPreviews = main.locator('[data-storefront-viewport][role="img"]');
    expect(await storefrontPreviews.count()).toBeGreaterThan(0);
    for (let index = 0; index < (await storefrontPreviews.count()); index += 1) {
      const preview = storefrontPreviews.nth(index);
      await expect(preview).toHaveAttribute(
        "aria-label",
        /Nocturne storefront preview, \S+ view\./,
      );
      const decorativeImages = preview.locator("img");
      expect(await decorativeImages.count()).toBeGreaterThan(0);
      for (let imageIndex = 0; imageIndex < (await decorativeImages.count()); imageIndex += 1) {
        await expect(decorativeImages.nth(imageIndex)).toHaveAttribute("alt", "");
        await expect(decorativeImages.nth(imageIndex)).toHaveAttribute("sizes", /\S/);
      }
    }

    const semanticImages = await main
      .locator("img")
      .evaluateAll((images) =>
        images
          .filter((image) => !image.closest("[data-storefront-viewport]"))
          .map((image) => ({ alt: image.alt, sizes: image.sizes })),
      );
    expect(semanticImages.length).toBeGreaterThan(0);
    expect(semanticImages.every(({ alt, sizes }) => alt.trim() && sizes.trim())).toBe(true);

    await expect(main.getByRole("link", { name: /Start with Nocturne/i }).first()).toHaveAttribute(
      "href",
      "/start-a-project?edition=nocturne",
    );
    await expectTruthfulCommercialPage(page);
  });

  test("publishes Nocturne metadata without product-review schema", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Metadata needs one browser project.");

    await page.goto("/editions/nocturne");

    await expect(page).toHaveTitle(/Nocturne \u2014 Fashion Shopify Edition \| ORVAUXE/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /ORVAUXE concept Edition for fashion and accessories on Shopify/i,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      /\/editions\/nocturne$/,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    const robotsDirective = await page
      .locator('meta[name="robots"]')
      .first()
      .getAttribute("content");
    // The isolated E2E server is deliberately non-production, so the root layout
    // protects every local route from indexing. Edition-level indexability and
    // sitemap inclusion are verified in the data and metadata unit suites.
    expect(robotsDirective ?? "").toMatch(/\bnoindex\b/i);
    await expectTruthfulCommercialPage(page);
  });

  test("carries Nocturne context into the Start a Project form", async ({ page }) => {
    await page.goto("/editions/nocturne");
    await page
      .locator("main#main-content")
      .getByRole("link", { name: /Start with Nocturne/i })
      .first()
      .click();

    await expect(page).toHaveURL(/\/start-a-project\?edition=nocturne$/);
    await expect(page.getByLabel("Project type")).toHaveValue("edition");
    await expect(page.getByLabel("Edition slug")).toHaveValue("nocturne");
  });
});

test("Editions routes remain composed at all six required viewports without runtime errors", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  const runtimeProblems: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      runtimeProblems.push(`console.${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => runtimeProblems.push(`pageerror: ${error.message}`));

  for (const viewport of requiredViewports) {
    await page.setViewportSize(viewport);
    for (const path of productionRoutes) {
      await expectResponsiveDocument(page, path);
    }
  }

  expect(runtimeProblems).toEqual([]);
});

test("Nocturne remains usable at mobile width and with reduced motion", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  await page.setViewportSize({ height: 812, width: 375 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/editions/nocturne");

  const motionState = await page.evaluate(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    return {
      editorialDuration: Number.parseFloat(
        rootStyles.getPropertyValue("--orvauxe-motion-editorial"),
      ),
      fastDuration: Number.parseFloat(rootStyles.getPropertyValue("--orvauxe-motion-fast")),
      prefersReducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      runningAnimations: document
        .getAnimations({ subtree: true })
        .filter((animation) => animation.playState === "running").length,
    };
  });

  expect(motionState).toEqual({
    editorialDuration: 0,
    fastDuration: 0,
    prefersReducedMotion: true,
    runningAnimations: 0,
  });

  const startLink = page
    .locator("main#main-content")
    .getByRole("link", { name: /Start with Nocturne/i })
    .first();
  await startLink.focus();
  await expect(startLink).toBeFocused();
  await expect(startLink).toBeVisible();
});
