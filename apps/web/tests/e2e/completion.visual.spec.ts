import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const visualStates = [
  { height: 812, name: "atelier-mobile-375.png", path: "/atelier", width: 375 },
  { height: 900, name: "atelier-desktop-1440.png", path: "/atelier", width: 1440 },
  { height: 812, name: "studio-mobile-375.png", path: "/studio", width: 375 },
  { height: 900, name: "studio-desktop-1440.png", path: "/studio", width: 1440 },
  { height: 812, name: "start-project-mobile-375.png", path: "/start-a-project", width: 375 },
  {
    height: 900,
    name: "start-project-desktop-1440.png",
    path: "/start-a-project?edition=nocturne",
    width: 1440,
  },
] as const;

async function primePage(page: Page): Promise<void> {
  await page.evaluate(async () => document.fonts.ready);
  const images = page.locator("main#main-content img:visible");
  await images.evaluateAll((elements) => {
    for (const image of elements) image.loading = "eager";
  });
  for (let index = 0; index < (await images.count()); index += 1) {
    const image = images.nth(index);
    await image.evaluate((element) => element.scrollIntoView({ block: "center" }));
    await expect.poll(() => image.evaluate((element) => element.complete)).toBe(true);
    await image.evaluate(async (element) => element.decode());
  }
  await page.evaluate(() => window.scrollTo(0, 0));
}

for (const state of visualStates) {
  test(`${state.name} visual baseline`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "Visual baselines use controlled Chromium.");

    await page.setViewportSize({ height: state.height, width: state.width });
    await page.goto(state.path, { waitUntil: "networkidle" });
    await primePage(page);

    await expect(page).toHaveScreenshot(state.name, {
      animations: "disabled",
      caret: "hide",
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
    });
  });
}
