import { expect, test } from "@playwright/test";

test("Homepage renders a truthful narrative and its primary paths work", async ({ page }) => {
  const consoleErrors: string[] = [];
  const pageErrors: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto("/");

  const main = page.locator("main#main-content");
  await expect(main).toBeVisible();
  await expect(main.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    "Commerce for the distinctive.",
  );

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

  await expect(main.getByRole("link", { name: /work|journal/i })).toHaveCount(0);
  await page.waitForLoadState("networkidle");

  const placeholderImages = main.locator('[data-placeholder="temporary"] img');
  await expect(placeholderImages).toHaveCount(2);
  await expect(placeholderImages.nth(0)).toHaveAttribute("loading", "lazy");
  await expect(placeholderImages.nth(0)).toHaveAttribute("sizes", "100vw");
  await expect(placeholderImages.nth(0)).toHaveAttribute("srcset", /\/_next\/image/);
  await expect(placeholderImages.nth(1)).toHaveAttribute("loading", "lazy");
  await expect(placeholderImages.nth(1)).toHaveAttribute(
    "sizes",
    "(min-width: 96rem) 60rem, (min-width: 64rem) 66vw, (min-width: 48rem) 62.5vw, 100vw",
  );
  await expect(placeholderImages.nth(1)).toHaveAttribute("srcset", /\/_next\/image/);

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);

  page.removeAllListeners("console");
  page.removeAllListeners("pageerror");

  const startProject = main.getByRole("link", { name: "Start a Project", exact: true }).first();
  await expect(startProject).toHaveAttribute("href", "/start-a-project");
  await startProject.click();
  await expect(page).toHaveURL(/\/start-a-project$/);

  await page.goBack();
  const exploreEditions = page
    .locator("main#main-content")
    .getByRole("link", { name: "Explore Editions", exact: true })
    .first();
  await expect(exploreEditions).toHaveAttribute("href", "/editions");
  await exploreEditions.click();
  await expect(page).toHaveURL(/\/editions$/);
});

test("Homepage is deliberately composed at representative widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  const viewports = [
    { height: 812, width: 375 },
    { height: 1024, width: 768 },
    { height: 900, width: 1440 },
    { height: 1080, width: 1920 },
    { height: 640, width: 1366 },
  ] as const;

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);
    await page.goto("/");

    const main = page.locator("main#main-content");
    const heroHeading = main.getByRole("heading", {
      level: 1,
      name: "Commerce for the distinctive.",
    });
    const primaryCta = main.getByRole("link", { name: "Start a Project", exact: true }).first();

    await expect(heroHeading).toBeVisible();
    await expect(primaryCta).toBeVisible();
    await expect(main.getByRole("heading", { name: "Nocturne", exact: true })).toBeVisible();

    const geometry = await page.evaluate(() => {
      const heading = document.querySelector("main h1");
      const rect = heading?.getBoundingClientRect();

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
  }
});
