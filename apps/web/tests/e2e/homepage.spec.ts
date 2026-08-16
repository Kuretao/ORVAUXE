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
    "Editions",
    "Nocturne",
    "Atelier",
    "ORVAUXE",
    "Have a brand worth building for?",
  ]) {
    await expect(main.getByRole("heading", { name: heading, exact: true })).toBeVisible();
  }

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

test("Reduced-motion campaign changes immediately without essential animation", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled browser is sufficient.");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const campaign = campaignFor(page.locator("main#main-content"));
  await campaign.getByRole("button", { name: "Next campaign state" }).click();
  await expectSelectedCampaignState(campaign, campaignStates[1]);
  await expect(campaign.locator("[data-asset-status] img")).toBeVisible();

  const activeMotionCount = await campaign.evaluate(
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
    }
  }
});
