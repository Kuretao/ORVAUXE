import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const visualStates = [
  {
    height: 812,
    name: "editions-mobile-375.png",
    path: "/editions",
    width: 375,
  },
  {
    height: 900,
    name: "editions-desktop-1440.png",
    path: "/editions",
    width: 1440,
  },
  {
    height: 812,
    name: "nocturne-mobile-375.png",
    path: "/editions/nocturne",
    width: 375,
  },
  {
    height: 900,
    name: "nocturne-desktop-1440.png",
    path: "/editions/nocturne",
    width: 1440,
  },
  {
    height: 1080,
    name: "nocturne-wide-1920.png",
    path: "/editions/nocturne",
    width: 1920,
  },
] as const;

async function primePageForFullPageCapture(page: Page): Promise<void> {
  await page.evaluate(async () => document.fonts.ready);

  const images = page.locator("main#main-content img:visible");
  // Chromium can omit offscreen lazy rasters from a long capture even after decode.
  await images.evaluateAll((elements) => {
    for (const image of elements) image.loading = "eager";
  });

  const imageCount = await images.count();
  for (let index = 0; index < imageCount; index += 1) {
    const image = images.nth(index);
    await image.evaluate((element) =>
      element.scrollIntoView({ block: "center", inline: "nearest" }),
    );
    await expect
      .poll(() =>
        image
          .evaluate((element) => element.complete && element.naturalWidth > 0)
          .catch(() => false),
      )
      .toBe(true);
    await image.evaluate(async (element) => element.decode());
  }

  await page.evaluate(() => window.scrollTo({ left: 0, top: 0 }));
  await page.waitForFunction(() => window.scrollY === 0);
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))),
  );
}

for (const state of visualStates) {
  test(`${state.name} visual baseline`, async ({ page }, testInfo) => {
    test.skip(
      testInfo.project.name !== "chromium",
      "Visual baselines use one controlled Chromium project.",
    );

    await page.setViewportSize({ height: state.height, width: state.width });
    await page.goto(state.path, { waitUntil: "networkidle" });
    await primePageForFullPageCapture(page);

    await expect(page).toHaveScreenshot(state.name, {
      animations: "disabled",
      caret: "hide",
      fullPage: true,
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
    });
  });
}
