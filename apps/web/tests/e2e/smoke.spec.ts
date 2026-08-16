import { expect, test } from "@playwright/test";

const launchRoutes = [
  "/",
  "/editions",
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
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    });
  }

  test("primary navigation exposes the structural routes", async ({ page }) => {
    await page.goto("/");

    const navigation = page.getByRole("navigation", { name: "Primary" });
    await expect(navigation.getByRole("link", { name: "Editions" })).toHaveAttribute(
      "href",
      "/editions",
    );
    await expect(navigation.getByRole("link", { name: "Start a project" })).toHaveAttribute(
      "href",
      "/start-a-project",
    );
  });

  test("an unknown route returns the application 404", async ({ page }) => {
    const response = await page.goto("/route-that-does-not-exist");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1, name: "Page not found" })).toBeVisible();
  });
});
