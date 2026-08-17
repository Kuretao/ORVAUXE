import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const accessibilityRoutes = ["/", "/editions", "/editions/nocturne", "/start-a-project"] as const;

async function expectNoBlockingAxeViolations(page: Page): Promise<void> {
  const result = await new AxeBuilder({ page }).analyze();
  const blockingViolations = result.violations
    .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => node.target),
    }));

  expect(blockingViolations).toEqual([]);
}

for (const path of accessibilityRoutes) {
  test(`${path} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);
    await expectNoBlockingAxeViolations(page);
  });
}

test("changed Homepage campaign state has no serious or critical axe violations", async ({
  page,
}) => {
  await page.goto("/");

  const campaign = page.locator("main#main-content [data-campaign-state]");
  await campaign.getByRole("button", { name: "Next campaign state" }).click();
  await expect(campaign).toHaveAttribute("data-campaign-state", "nocturne");
  await expectNoBlockingAxeViolations(page);
});

test("changed Homepage storefront-system state has no serious or critical axe violations", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "Tall desktop interaction only.");

  await page.setViewportSize({ height: 900, width: 1440 });
  await page.goto("/");

  const system = page.getByRole("region", { name: "A complete storefront system." });
  const product = system.getByRole("button", { name: /^Product/ });
  await product.click();
  await expect(system.locator("[data-system-state]")).toHaveAttribute(
    "data-system-state",
    "product",
  );
  await expect(product).toHaveAttribute("aria-pressed", "true");
  await expectNoBlockingAxeViolations(page);
});

test("open mobile navigation has no serious or critical axe violations", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile navigation viewport only.");

  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expectNoBlockingAxeViolations(page);
});
