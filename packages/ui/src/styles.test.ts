import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const packageRoot = process.cwd();
const styles = await readFile(path.join(packageRoot, "src/styles.css"), "utf8");
const packageJson = JSON.parse(await readFile(path.join(packageRoot, "package.json"), "utf8")) as {
  exports: Record<string, string>;
};

describe("UI style contract", () => {
  it("styles every exported primitive through stable public selectors", () => {
    const selectors = [
      ".orvauxe-button",
      ".orvauxe-link",
      ".orvauxe-heading",
      ".orvauxe-text",
      ".orvauxe-container",
      ".orvauxe-grid",
      ".orvauxe-divider",
      ".orvauxe-media",
      ".orvauxe-focus-ring",
    ];

    for (const selector of selectors) {
      expect(styles).toContain(`${selector} {`);
    }

    expect(packageJson.exports["./styles.css"]).toBe("./src/styles.css");
  });

  it("uses semantic tokens without introducing raw colors or framework coupling", () => {
    expect(styles).toContain("var(--orvauxe-surface-secondary)");
    expect(styles).toContain("var(--orvauxe-text-primary)");
    expect(styles).toContain("var(--orvauxe-target-min)");
    expect(styles).not.toMatch(/#[\da-f]{3,8}\b/i);
    expect(styles).not.toMatch(/@import\s+["'](?:tailwindcss|next)/);
  });
});
