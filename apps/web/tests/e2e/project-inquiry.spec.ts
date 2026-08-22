import { expect, test } from "@playwright/test";

import { projectInquiryFixture } from "../fixtures/project-inquiry";

test.describe("project inquiry in deterministic stub mode", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/start-a-project");
  });

  test("exposes required fields through accessible labels", async ({ page }) => {
    const form = page.getByRole("form", { name: "Project inquiry" });

    await expect(form).toBeVisible();
    await expect(page.getByLabel(/Name/)).toHaveJSProperty("required", true);
    await expect(page.getByLabel(/Email/)).toHaveJSProperty("required", true);
    await expect(page.getByLabel(/What are you building/)).toHaveJSProperty("required", true);
    await expect(page.getByLabel(/Project context/)).toHaveJSProperty("required", true);
  });

  test("preserves the Nocturne Edition preselection", async ({ page }) => {
    await page.goto("/start-a-project?edition=nocturne");

    await expect(page.getByLabel(/What are you building/)).toHaveValue("edition");
    await expect(page.getByLabel("Edition interest")).toHaveValue("nocturne");
  });

  test("accepts the deterministic fixture without contacting vendors", async ({ page }) => {
    await page.getByLabel(/Name/).fill(projectInquiryFixture.name);
    await page.getByLabel(/Email/).fill(projectInquiryFixture.email);
    await page.getByLabel(/What are you building/).selectOption({ index: 1 });
    await page.getByLabel("Budget range").selectOption({ index: 1 });
    await page.getByLabel(/Project context/).fill(projectInquiryFixture.projectDetails);
    await page.getByRole("button", { name: "Verify & continue" }).click();
    await page.getByRole("button", { name: "Submit inquiry" }).click();

    await expect(page.getByRole("status")).toContainText(/accepted|received|submitted/i);
    await expect(page.getByRole("button", { name: "Inquiry received" })).toBeDisabled();
    await expect(page.getByLabel(/Name/)).toBeDisabled();
  });
});
