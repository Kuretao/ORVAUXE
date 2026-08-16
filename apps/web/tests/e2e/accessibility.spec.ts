import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const accessibilityRoutes = ["/", "/editions", "/start-a-project"] as const;

for (const path of accessibilityRoutes) {
  test(`${path} has no serious or critical axe violations`, async ({ page }) => {
    await page.goto(path);

    const result = await new AxeBuilder({ page }).analyze();
    const blockingViolations = result.violations
      .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
      .map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.map((node) => node.target),
      }));

    expect(blockingViolations).toEqual([]);
  });
}

test("open mobile navigation has no serious or critical axe violations", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile-chromium", "Mobile navigation viewport only.");

  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();

  const result = await new AxeBuilder({ page }).analyze();
  const blockingViolations = result.violations
    .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
    .map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      nodes: violation.nodes.map((node) => node.target),
    }));

  expect(blockingViolations).toEqual([]);
});
