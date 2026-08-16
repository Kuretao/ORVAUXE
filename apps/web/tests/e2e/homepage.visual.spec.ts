import { expect, test } from "@playwright/test";

const visualStates = [
  { fullPage: true, height: 812, name: "home-mobile-375.png", width: 375 },
  {
    fullPage: false,
    height: 640,
    name: "home-short-laptop-1366x640.png",
    width: 1366,
  },
  { fullPage: true, height: 900, name: "home-desktop-1440.png", width: 1440 },
  { fullPage: true, height: 1080, name: "home-wide-1920.png", width: 1920 },
] as const;

for (const state of visualStates) {
  test(`${state.name} visual baseline`, async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Visual baselines use one controlled Chromium project.",
    );

    await page.setViewportSize({ height: state.height, width: state.width });
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(async () => document.fonts.ready);
    await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete));

    await expect(page).toHaveScreenshot(state.name, {
      animations: "disabled",
      caret: "hide",
      fullPage: state.fullPage,
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
    });
  });
}
