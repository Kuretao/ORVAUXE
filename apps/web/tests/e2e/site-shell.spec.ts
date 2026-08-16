import { expect, test } from "@playwright/test";

test("desktop shell exposes current navigation and a working skip link", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Desktop viewport only.");

  await page.goto("/editions/e2e-edition");

  const primaryNavigation = page.getByRole("navigation", { name: "Primary" });
  await expect(primaryNavigation).toBeVisible();
  await expect(primaryNavigation.getByRole("link")).toHaveCount(4);
  await expect(primaryNavigation.getByRole("link", { name: "Editions" })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
  await expect(page.locator("main")).toHaveCount(1);

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  const mainContent = page.locator("main#main-content");
  await expect(mainContent).toBeFocused();
  await expect(mainContent).toHaveCSS("outline-style", "solid");
  await expect(mainContent).toHaveCSS("outline-width", "2px");
});

test("mobile shell manages its modal, focus, scroll, Escape, and route selection", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile viewport only.");

  await page.goto("/editions");

  const menuButton = page.getByRole("button", { name: "Open navigation" });
  await expect(menuButton).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();

  await menuButton.click();

  const dialog = page.getByRole("dialog", { name: "Site navigation" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toHaveAttribute("aria-modal", "true");
  expect(await dialog.evaluate((element) => element.matches(":modal"))).toBe(true);
  await expect(dialog.getByRole("button", { name: "Close navigation" })).toBeFocused();
  expect(await page.locator("body").evaluate((element) => element.style.overflow)).toBe("hidden");

  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("link", { name: "Start a Project" })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(dialog.getByRole("button", { name: "Close navigation" })).toBeFocused();

  await page.keyboard.press("Escape");

  await expect(dialog).toBeHidden();
  await expect(menuButton).toBeFocused();
  expect(await page.locator("body").evaluate((element) => element.style.overflow)).toBe("");

  await menuButton.click();
  await dialog.getByRole("link", { name: "Atelier" }).click();

  await expect(page).toHaveURL(/\/atelier$/);
  await expect(dialog).toBeHidden();
  expect(await page.locator("body").evaluate((element) => element.style.overflow)).toBe("");
  await expect(page.locator('nav[aria-label="Primary"] a[href="/atelier"]')).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.locator("main")).toHaveCount(1);
});

test("shell reflows without horizontal overflow at representative foundation widths", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  await page.goto("/");

  for (const viewport of [
    { height: 812, width: 375 },
    { height: 1024, width: 768 },
    { height: 1000, width: 1440 },
    { height: 1080, width: 1920 },
  ]) {
    await page.setViewportSize(viewport);

    if (viewport.width >= 1024) {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
      await expect(page.getByRole("button", { name: "Open navigation" })).toBeHidden();
    } else {
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeHidden();
      await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();
    }

    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await expect(page.locator("main")).toHaveCount(1);
  }
});

test("reduced-motion preference removes foundation transitions", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "One controlled Chromium project is sufficient.");

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const motionState = await page.evaluate(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const skipLink = document.querySelector<HTMLAnchorElement>('a[href="#main-content"]');

    return {
      editorialDuration: Number.parseFloat(
        rootStyles.getPropertyValue("--orvauxe-motion-editorial"),
      ),
      fastDuration: Number.parseFloat(rootStyles.getPropertyValue("--orvauxe-motion-fast")),
      skipTransition: skipLink ? getComputedStyle(skipLink).transitionDuration : null,
    };
  });

  expect(motionState).toEqual({
    editorialDuration: 0,
    fastDuration: 0,
    skipTransition: "0s",
  });
});
