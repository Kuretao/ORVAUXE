import { expect, test } from "@playwright/test";
import type { Locator } from "@playwright/test";

const campaignStates = [
  { id: "brand", index: "01", title: "Commerce for the distinctive." },
  { id: "nocturne", index: "02", title: "Nocturne" },
  { id: "atelier", index: "03", title: "Atelier" },
] as const;

const campaignDestinations = [
  { href: "/editions", label: "Editions" },
  { href: "/atelier", label: "Atelier" },
  { href: "/editions", label: "Nocturne" },
  { href: "/studio", label: "Studio" },
] as const;

const expandedSectionLabels = [
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

const expandedRegionNames = [
  "Commerce for the distinctive.",
  "Built to be desired. Designed to be bought.",
  "Commerce shaped around the brand.",
  "Editions",
  "Nocturne",
  "A complete storefront system.",
  "Atelier",
  "From direction to launch.",
  "ORVAUXE",
  "Have a brand worth building for?",
] as const;

const storefrontStages = ["Home", "Collection", "Product", "Cart", "Editorial", "Mobile"] as const;

function campaignFor(main: Locator): Locator {
  return main.locator("[data-campaign-state]");
}

async function expectActiveCampaignState(
  campaign: Locator,
  state: (typeof campaignStates)[number],
): Promise<void> {
  await expect(campaign).toHaveAttribute("data-campaign-state", state.id);
  await expect(campaign.getByRole("heading", { level: 1 })).toHaveText(state.title);
}

async function expectSelectedCampaignState(
  campaign: Locator,
  state: (typeof campaignStates)[number],
): Promise<void> {
  await expectActiveCampaignState(campaign, state);
  await expect(campaign.locator('[aria-live="polite"]')).toContainText(
    `${state.index} / 03 · ${state.title}`,
  );
}

test("Homepage renders a truthful manual campaign and exact destination rail", async ({
  page,
}, testInfo) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");

  const main = page.locator("main#main-content");
  const campaign = campaignFor(main);
  const initialState = campaignStates[0];

  await expect(main).toBeVisible();
  await expect(main.getByRole("heading", { level: 1 })).toHaveCount(1);
  await expectSelectedCampaignState(campaign, initialState);
  await expect(campaign.getByText("Premium Shopify storefronts", { exact: false })).toBeVisible();
  await expect(campaign.getByText("Commerce Atelier", { exact: true })).toBeVisible();
  await expect(campaign.getByText("Chengdu · Worldwide", { exact: true })).toBeVisible();

  const campaignImage = campaign.locator("[data-asset-status] img");
  await expect(campaignImage).toHaveCount(1);
  await expect(campaignImage).toHaveAttribute("loading", "eager");
  await expect(campaignImage).toHaveAttribute("fetchpriority", "high");
  await expect(campaignImage).toHaveAttribute("sizes", "100vw");
  await expect(campaignImage).toHaveAttribute("srcset", /\/_next\/image/);

  const destinationRail = campaign.getByRole("navigation", { name: "Homepage destinations" });
  const destinationLinks = destinationRail.getByRole("link");
  await expect(destinationLinks).toHaveCount(campaignDestinations.length);

  for (const [index, destination] of campaignDestinations.entries()) {
    const link = destinationLinks.nth(index);
    await expect(link).toContainText(destination.label);
    await expect(link).toHaveAttribute("href", destination.href);
    await link.focus();
    await expect(link).toBeFocused();
  }

  await expect(page.getByRole("link", { name: /work|journal/i })).toHaveCount(0);
  await expect(
    page.getByText(/\btemporary\b|production photography pending|final edition imagery pending/i),
  ).toHaveCount(0);

  for (const heading of [
    "Built to be desired. Designed to be bought.",
    "Commerce shaped around the brand.",
    "Editions",
    "A complete storefront system.",
    "Atelier",
    "From direction to launch.",
    "ORVAUXE",
    "Have a brand worth building for?",
  ]) {
    await expect(main.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }

  await expect(
    main
      .getByRole("region", { name: "Nocturne", exact: true })
      .getByRole("heading", { name: "Nocturne", exact: true, level: 2 }),
  ).toBeVisible();

  if (testInfo.project.name === "chromium") {
    await destinationLinks.nth(2).hover();
    await expectActiveCampaignState(campaign, campaignStates[1]);
    await expect(campaign.locator('[aria-live="polite"]')).toContainText(
      `${initialState.index} / 03 · ${initialState.title}`,
    );
    await page.mouse.move(1, 1);
    await expectSelectedCampaignState(campaign, initialState);
  }

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("Homepage exposes the expanded product narrative, scope, and truthful routes", async ({
  page,
}) => {
  await page.goto("/");

  const main = page.locator("main#main-content");
  await expect(main.locator(":scope > section")).toHaveCount(expandedSectionLabels.length);
  expect(
    await main
      .locator(":scope > section")
      .evaluateAll((sections) =>
        sections.map((section) => section.getAttribute("aria-labelledby")),
      ),
  ).toEqual(expandedSectionLabels);

  for (const name of expandedRegionNames) {
    await expect(main.getByRole("region", { name, exact: true })).toHaveCount(1);
  }

  const whatWeBuild = main.getByRole("region", {
    name: "Commerce shaped around the brand.",
  });
  const signals = whatWeBuild.getByRole("list", { name: "Core storefront capabilities" });
  await expect(signals.getByRole("listitem")).toHaveCount(3);
  for (const signal of ["Brand-led UX", "Commerce architecture", "Shopify implementation"]) {
    await expect(signals.getByText(signal, { exact: true })).toBeVisible();
  }

  const productProof = whatWeBuild.locator("img");
  await expect(productProof).toHaveCount(2);
  for (let index = 0; index < (await productProof.count()); index += 1) {
    await expect(productProof.nth(index)).toHaveAttribute("loading", "lazy");
    await expect(productProof.nth(index)).toHaveAttribute("sizes", /\S/);
    await expect(productProof.nth(index)).toHaveAttribute("srcset", /\/_next\/image/);
  }

  const editions = main.getByRole("region", { name: "Editions", exact: true });
  await expect(editions.getByText(/Curated premium storefront systems/)).toBeVisible();
  await expect(editions.getByRole("link", { name: "Explore Editions" })).toHaveAttribute(
    "href",
    "/editions",
  );
  await expect(main.getByText("From $2,490", { exact: true })).toHaveCount(1);

  const nocturne = main.getByRole("region", { name: "Nocturne", exact: true });
  await expect(nocturne.getByText("04 / Edition 001", { exact: true })).toBeVisible();
  await expect(nocturne.getByText("Fashion", { exact: true })).toBeVisible();
  await expect(
    nocturne.getByText("Concept Edition / ORVAUXE Original", { exact: true }),
  ).toBeVisible();
  await expect(nocturne.getByText("Shopify", { exact: true })).toBeVisible();
  await expect(nocturne.getByRole("link", { name: "Explore Editions" })).toHaveAttribute(
    "href",
    "/editions",
  );
  const nocturneImages = nocturne.locator("img");
  expect(await nocturneImages.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await nocturneImages.count()); index += 1) {
    await expect(nocturneImages.nth(index)).toHaveAttribute("loading", "lazy");
    await expect(nocturneImages.nth(index)).toHaveAttribute("sizes", /\S/);
  }

  const system = main.getByRole("region", {
    name: "A complete storefront system.",
  });
  const visibleSystemList = system.locator('ol[aria-label="Included storefront views"]:visible');
  await expect(visibleSystemList).toHaveCount(1);
  await expect(visibleSystemList.getByRole("listitem")).toHaveCount(storefrontStages.length);
  for (const stage of storefrontStages) {
    await expect(visibleSystemList.getByText(stage, { exact: true })).toBeVisible();
  }

  const atelier = main.getByRole("region", { name: "Atelier", exact: true });
  await expect(atelier.getByRole("link", { name: "Discover Atelier" })).toHaveAttribute(
    "href",
    "/atelier",
  );

  const process = main.getByRole("region", { name: "From direction to launch." });
  await expect(process.locator("ol > li")).toHaveCount(4);
  for (const stage of ["Direction", "Adaptation", "Build", "Launch"]) {
    await expect(process.getByRole("heading", { level: 3, name: stage })).toBeVisible();
  }

  const finalCta = main.getByRole("region", { name: "Have a brand worth building for?" });
  await expect(finalCta.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
    "href",
    "/start-a-project",
  );

  await expect(page.locator('a[href="/editions/nocturne"]')).toHaveCount(0);
  await expect(page.locator('a[href^="/work"], a[href^="/journal"]')).toHaveCount(0);
  await expect(
    page.getByText(
      /\b(?:temporary|placeholder|fake|mock)\b|final (?:media|imagery) pending|demo only/i,
    ),
  ).toHaveCount(0);
});

test("Expanded Homepage lazy media loads during a full native scroll without browser errors", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled browser is sufficient.");

  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/");

  const main = page.locator("main#main-content");
  const sections = main.locator(":scope > section");
  for (let sectionIndex = 0; sectionIndex < (await sections.count()); sectionIndex += 1) {
    const section = sections.nth(sectionIndex);
    await section.scrollIntoViewIfNeeded();

    const visibleImages = section.locator("img:visible");
    const imageCount = await visibleImages.count();
    for (let imageIndex = 0; imageIndex < imageCount; imageIndex += 1) {
      await visibleImages
        .nth(imageIndex)
        .evaluate((image) => image.scrollIntoView({ block: "center", inline: "nearest" }));
      await expect
        .poll(() =>
          visibleImages
            .nth(imageIndex)
            .evaluate((image) => image.complete && image.naturalWidth > 0)
            .catch(() => false),
        )
        .toBe(true);
    }
  }

  await expect(main.locator('img[loading="eager"]')).toHaveCount(1);
  const lazyImages = main.locator('img[loading="lazy"]');
  expect(await lazyImages.count()).toBeGreaterThan(0);
  for (let index = 0; index < (await lazyImages.count()); index += 1) {
    await expect(lazyImages.nth(index)).toHaveAttribute("sizes", /\S/);
    await expect(lazyImages.nth(index)).toHaveAttribute("srcset", /\/_next\/image/);
  }

  const finalCta = main.getByRole("region", { name: "Have a brand worth building for?" });
  await finalCta.scrollIntoViewIfNeeded();
  await expect(finalCta).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(1440);
  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("Tall desktop storefront system supports focused manual states and native scrolling", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Tall desktop interaction only.");

  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/");

  const main = page.locator("main#main-content");
  const system = main.getByRole("region", { name: "A complete storefront system." });
  const state = system.locator("[data-system-state]");
  const controls = system.getByRole("button");
  await expect(controls).toHaveCount(storefrontStages.length);
  await expect(state).toHaveAttribute("data-system-state", "home");

  const product = system.getByRole("button", { name: /^Product/ });
  await product.click();
  await expect(product).toBeFocused();
  await expect(product).toHaveAttribute("aria-pressed", "true");
  await expect(state).toHaveAttribute("data-system-state", "product");
  await expect(system.locator('[data-storefront-view="product"]:visible')).toHaveCount(1);

  const mobile = system.getByRole("button", { name: /^Mobile/ });
  await mobile.click();
  await expect(mobile).toHaveAttribute("aria-pressed", "true");
  await expect(state).toHaveAttribute("data-system-state", "mobile");

  const initialScrollY = await page.evaluate(() => window.scrollY);
  await page.mouse.wheel(0, 320);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialScrollY);
  expect(
    await page.locator("body").evaluate((element) => getComputedStyle(element).overflowY),
  ).not.toBe("hidden");

  const atelier = main.getByRole("region", { name: "Atelier", exact: true });
  await atelier.scrollIntoViewIfNeeded();
  await expect(atelier).toBeInViewport();
});

test("Campaign controls retain keyboard focus, expose all three states, and wrap", async ({
  page,
}) => {
  await page.goto("/");

  const campaign = campaignFor(page.locator("main#main-content"));
  const campaignImage = campaign.locator("[data-asset-status] img");
  const previous = campaign.getByRole("button", { name: "Previous campaign state" });
  const next = campaign.getByRole("button", { name: "Next campaign state" });

  await next.focus();
  await next.press("Enter");
  await expect(next).toBeFocused();
  await expectSelectedCampaignState(campaign, campaignStates[1]);
  await expect(campaignImage).toHaveAttribute("loading", "lazy");

  await next.press("Enter");
  await expect(next).toBeFocused();
  await expectSelectedCampaignState(campaign, campaignStates[2]);
  await expect(campaignImage).toHaveAttribute("loading", "lazy");

  await next.press("Enter");
  await expect(next).toBeFocused();
  await expectSelectedCampaignState(campaign, campaignStates[0]);
  await expect(campaignImage).toHaveAttribute("loading", "lazy");

  await previous.focus();
  await previous.press("Enter");
  await expect(previous).toBeFocused();
  await expectSelectedCampaignState(campaign, campaignStates[2]);
});

test("Campaign remains on its selected state without autoplay", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled browser is sufficient.");

  await page.goto("/");

  const campaign = campaignFor(page.locator("main#main-content"));
  await expectSelectedCampaignState(campaign, campaignStates[0]);

  // A temporal assertion is intentional here: the campaign must never advance on its own.
  await page.waitForTimeout(6_000);
  await expectSelectedCampaignState(campaign, campaignStates[0]);
});

test("Homepage primary campaign links navigate to implemented routes", async ({ page }) => {
  await page.goto("/");

  const campaign = campaignFor(page.locator("main#main-content"));
  const startProject = campaign.getByRole("link", { name: /Start a Project/ });
  await expect(startProject).toHaveAttribute("href", "/start-a-project");
  await startProject.click();
  await expect(page).toHaveURL(/\/start-a-project$/);

  await page.goBack();
  const destinationRail = campaignFor(page.locator("main#main-content")).getByRole("navigation", {
    name: "Homepage destinations",
  });
  const editions = destinationRail.getByRole("link").first();
  await expect(editions).toHaveAttribute("href", "/editions");
  await editions.click();
  await expect(page).toHaveURL(/\/editions$/);
});

test("Mobile campaign rail is scrollable, reachable, and does not overflow the document", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile interaction viewport only.");

  await page.setViewportSize({ height: 812, width: 375 });
  await page.goto("/");

  const campaign = campaignFor(page.locator("main#main-content"));
  const destinationRail = campaign.getByRole("navigation", { name: "Homepage destinations" });
  const destinationList = destinationRail.locator("ol");
  const destinationLinks = destinationRail.getByRole("link");

  await expect(destinationLinks).toHaveCount(4);

  const geometry = await page.evaluate(() => {
    const list = document.querySelector<HTMLElement>('nav[aria-label="Homepage destinations"] ol');
    const controls = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-campaign-state] button[aria-label$="campaign state"]',
      ),
    );
    const destinations = Array.from(
      document.querySelectorAll<HTMLElement>('nav[aria-label="Homepage destinations"] a'),
    );

    return {
      controlTargets: controls.map(({ offsetHeight, offsetWidth }) => ({
        height: offsetHeight,
        width: offsetWidth,
      })),
      destinationTargets: destinations.map(({ offsetHeight, offsetWidth }) => ({
        height: offsetHeight,
        width: offsetWidth,
      })),
      documentWidth: document.documentElement.scrollWidth,
      railClientWidth: list?.clientWidth ?? 0,
      railScrollWidth: list?.scrollWidth ?? 0,
      viewportWidth: window.innerWidth,
    };
  });

  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
  expect(geometry.railScrollWidth).toBeGreaterThan(geometry.railClientWidth);
  for (const target of [...geometry.controlTargets, ...geometry.destinationTargets]) {
    expect(target.height).toBeGreaterThanOrEqual(44);
    expect(target.width).toBeGreaterThanOrEqual(44);
  }

  await destinationList.evaluate((element) => element.scrollTo({ left: element.scrollWidth }));
  await destinationLinks.last().scrollIntoViewIfNeeded();
  await expect(destinationLinks.last()).toBeInViewport();
  await destinationLinks.last().focus();
  await expect(destinationLinks.last()).toBeFocused();

  const next = campaign.getByRole("button", { name: "Next campaign state" });
  await next.tap();
  await expectSelectedCampaignState(campaign, campaignStates[1]);
});

test("Reduced-motion Homepage keeps campaign and storefront content immediately usable", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled browser is sufficient.");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const campaign = campaignFor(page.locator("main#main-content"));
  await campaign.getByRole("button", { name: "Next campaign state" }).click();
  await expectSelectedCampaignState(campaign, campaignStates[1]);
  await expect(campaign.locator("[data-asset-status] img")).toBeVisible();

  const main = page.locator("main#main-content");
  const system = main.getByRole("region", { name: "A complete storefront system." });
  const visibleSystemList = system.locator('ol[aria-label="Included storefront views"]:visible');
  await expect(visibleSystemList.getByRole("listitem")).toHaveCount(storefrontStages.length);
  for (const stage of storefrontStages) {
    await expect(visibleSystemList.getByText(stage, { exact: true })).toBeVisible();
  }

  const activeMotionCount = await main.evaluate(
    (element) => element.getAnimations({ subtree: true }).length,
  );
  expect(activeMotionCount).toBe(0);
});

test("Homepage is deliberately composed at representative widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  const viewports = [
    { height: 720, width: 320 },
    { height: 812, width: 375 },
    { height: 1024, width: 768 },
    { height: 640, width: 1366 },
    { height: 900, width: 1440 },
    { height: 1080, width: 1920 },
  ] as const;

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const main = page.locator("main#main-content");
    const campaign = campaignFor(main);
    const heading = campaign.getByRole("heading", { level: 1 });
    const primaryCta = campaign.getByRole("link", { name: /Start a Project/ });
    const previous = campaign.getByRole("button", { name: "Previous campaign state" });
    const next = campaign.getByRole("button", { name: "Next campaign state" });

    await expectSelectedCampaignState(campaign, campaignStates[0]);
    await expect(heading).toBeVisible();
    await expect(primaryCta).toBeVisible();
    await expect(previous).toBeVisible();
    await expect(next).toBeVisible();

    const geometry = await page.evaluate(() => {
      const campaignHeading = document.querySelector<HTMLElement>("main h1");
      const rect = campaignHeading?.getBoundingClientRect();

      return {
        documentWidth: document.documentElement.scrollWidth,
        headingLeft: rect?.left ?? -1,
        headingRight: rect?.right ?? Number.POSITIVE_INFINITY,
        viewportWidth: window.innerWidth,
      };
    });

    expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewportWidth);
    expect(geometry.headingLeft).toBeGreaterThanOrEqual(0);
    expect(geometry.headingRight).toBeLessThanOrEqual(geometry.viewportWidth);

    if (viewport.width === 1366 && viewport.height === 640) {
      await expect(
        campaign.getByRole("navigation", { name: "Homepage destinations" }),
      ).toBeInViewport();

      const system = main.getByRole("region", { name: "A complete storefront system." });
      const systemRail = system.locator('ol[aria-label="Included storefront views"]:visible');
      await systemRail.evaluate((element) => element.scrollTo({ left: element.scrollWidth }));
      await systemRail.getByRole("listitem").last().scrollIntoViewIfNeeded();
      await expect(systemRail.getByRole("listitem").last()).toBeInViewport();

      const atelier = main.getByRole("region", { name: "Atelier", exact: true });
      await atelier.scrollIntoViewIfNeeded();
      await expect(atelier).toBeInViewport();
    }

    for (const name of expandedRegionNames.slice(1)) {
      const region = main.getByRole("region", { name, exact: true });
      await region.scrollIntoViewIfNeeded();
      await expect(region).toBeInViewport();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
    }
  }
});
