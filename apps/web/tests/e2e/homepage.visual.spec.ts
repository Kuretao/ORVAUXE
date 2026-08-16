import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

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

async function primeLazyMedia(page: Page): Promise<void> {
  await page.evaluate(async () => document.fonts.ready);

  const images = page.locator("main#main-content img:visible");
  const imageCount = await images.count();
  for (let index = 0; index < imageCount; index += 1) {
    await images
      .nth(index)
      .evaluate((image) => image.scrollIntoView({ block: "center", inline: "nearest" }));
    await expect
      .poll(() =>
        images
          .nth(index)
          .evaluate((image) => image.complete && image.naturalWidth > 0)
          .catch(() => false),
      )
      .toBe(true);
  }

  const system = page.locator("main#main-content [data-system-state]");
  const homeControl = page.getByRole("button", { name: /^Home/ });
  if ((await homeControl.count()) > 0 && (await homeControl.first().isVisible())) {
    await homeControl.first().click();
  }

  await page.locator('ol[aria-label="Included storefront views"]').evaluateAll((lists) => {
    for (const list of lists) list.scrollTo({ left: 0, top: 0 });
  });
  await page.evaluate(() => window.scrollTo({ left: 0, top: 0 }));
  await page.waitForFunction(() => window.scrollY === 0);
  await expect(system).toHaveAttribute("data-system-state", "home");
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
    await page.goto("/", { waitUntil: "networkidle" });
    await primeLazyMedia(page);

    await expect(page).toHaveScreenshot(state.name, {
      animations: "disabled",
      caret: "hide",
      fullPage: state.fullPage,
      maxDiffPixelRatio: 0.02,
      threshold: 0.25,
    });
  });
}
