import { expect, test } from "@playwright/test";

const launchRoutes = [
  "/",
  "/editions",
  "/editions/nocturne",
  "/editions/e2e-edition",
  "/atelier",
  "/studio",
  "/start-a-project",
  "/legal/privacy",
] as const;

test.describe("launch route skeleton", () => {
  for (const path of launchRoutes) {
    test(`${path} renders a usable document`, async ({ page }) => {
      const response = await page.goto(path);

      expect(response?.status()).toBeLessThan(400);
      await expect(page.locator("main#main-content")).toBeVisible();
      await expect(page.locator("main")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("primary navigation exposes only the launch routes", async ({ page }, testInfo) => {
    await page.goto("/");

    if (testInfo.project.name === "mobile-chromium") {
      await page.getByRole("button", { name: "Open navigation" }).click();
    }

    const navigation = page.getByRole("navigation", {
      name: testInfo.project.name === "mobile-chromium" ? "Mobile" : "Primary",
    });
    await expect(navigation.getByRole("link")).toHaveCount(4);
    await expect(navigation.getByRole("link", { name: "Editions" })).toHaveAttribute(
      "href",
      "/editions",
    );
    await expect(navigation.getByRole("link", { name: "Start a Project" })).toHaveAttribute(
      "href",
      "/start-a-project",
    );
    await expect(navigation.getByRole("link", { name: "Home" })).toHaveCount(0);
  });

  test("an unknown route returns the application 404", async ({ page }) => {
    const response = await page.goto("/route-that-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  });
});
