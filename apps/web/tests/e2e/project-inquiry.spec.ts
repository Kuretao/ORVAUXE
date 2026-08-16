import { expect, test } from "@playwright/test";

import { projectInquiryFixture } from "../fixtures/project-inquiry";

test.describe("project inquiry skeleton in deterministic stub mode", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/start-a-project");
  });

  test("exposes required fields through accessible labels", async ({ page }) => {
    const form = page.getByRole("form", { name: "Project inquiry" });

    await expect(form).toBeVisible();
    await expect(page.getByLabel("Name")).toHaveJSProperty("required", true);
    await expect(page.getByLabel("Email")).toHaveJSProperty("required", true);
    await expect(page.getByLabel("Project type")).toHaveJSProperty("required", true);
    await expect(page.getByLabel("Project details")).toHaveJSProperty("required", true);
  });

  test("accepts the deterministic fixture without contacting vendors", async ({ page }) => {
    await page.getByLabel("Name").fill(projectInquiryFixture.name);
    await page.getByLabel("Email").fill(projectInquiryFixture.email);
    await page.getByLabel("Project type").selectOption({ index: 1 });
    await page.getByLabel("Budget range").selectOption({ index: 1 });
    await page.getByLabel("Project details").fill(projectInquiryFixture.projectDetails);
    await page.getByRole("button", { name: "Prepare verification" }).click();
    await page.getByRole("button", { name: "Submit inquiry" }).click();

    await expect(page.getByRole("status")).toContainText(/accepted|received|submitted/i);
    await expect(page.getByRole("button", { name: "Submit inquiry" })).toBeDisabled();
    await expect(page.getByLabel("Name")).toBeDisabled();
  });
});
