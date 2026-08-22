import { expect, test } from "@playwright/test";

const completedRoutes = [
  "/",
  "/editions",
  "/editions/nocturne",
  "/atelier",
  "/studio",
  "/start-a-project",
] as const;

const viewports = [
  { width: 320, height: 812 },
  { width: 375, height: 812 },
  { width: 390, height: 844 },
  { width: 430, height: 932 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1366, height: 640 },
  { width: 1440, height: 900 },
  { width: 1920, height: 900 },
] as const;

const completedMetadata = [
  { path: "/", title: /Premium Commerce/i },
  { path: "/editions", title: /Editions/i },
  { path: "/editions/nocturne", title: /Nocturne/i },
  { path: "/atelier", title: /Bespoke Commerce/i },
  { path: "/studio", title: /Independent Commerce Atelier/i },
  { path: "/start-a-project", title: /Start a Project/i },
] as const;

for (const item of completedMetadata) {
  test(`${item.path} exposes final-quality metadata`, async ({ page }) => {
    await page.goto(item.path);
    await expect(page).toHaveTitle(item.title);
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(description?.trim().length).toBeGreaterThanOrEqual(40);
    expect(await page.title()).not.toMatch(/neutral|skeleton|placeholder/i);
  });
}

for (const path of completedRoutes) {
  test(`${path} remains usable across the completion viewport matrix`, async ({
    page,
  }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "One controlled Chromium project is sufficient.",
    );

    await page.goto(path);

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await expect(page.locator("main#main-content")).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    }
  });
}

test("completed public routes keep private product data out of customer-visible copy", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  for (const path of completedRoutes) {
    await page.goto(path);
    const publicCopy = await page.locator("body").innerText();

    expect(publicCopy).not.toMatch(
      /Kuretao\/Nocturne|github\.com\/Kuretao\/Nocturne|myshopify\.com|\/admin\/themes\/|theme_id|C:\\Users/i,
    );
  }

  await page.goto("/editions/nocturne");
  const nocturne = page.locator("main#main-content");
  await expect(nocturne.getByText("Concept Edition", { exact: true }).first()).toBeVisible();
  await expect(nocturne.getByText("Available", { exact: true })).toHaveCount(0);
  await expect(
    nocturne.getByRole("link", { name: /live demo|preview theme|theme store/i }),
  ).toHaveCount(0);
});
