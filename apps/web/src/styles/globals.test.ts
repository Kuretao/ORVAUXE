import { readFile } from "node:fs/promises";
import path from "node:path";

import { describe, expect, it } from "vitest";

const styles = await readFile(path.join(process.cwd(), "src/styles/globals.css"), "utf8");

describe("global visual foundation", () => {
  it("keeps workspace UI classes in Tailwind discovery and imports the public style contracts", () => {
    expect(styles).toContain('@source "../../../../packages/ui/src";');
    expect(styles).toContain('@import "@orvauxe/tokens/styles.css";');
    expect(styles).toContain('@import "@orvauxe/ui/styles.css";');
  });

  it("uses semantic colors for the body, selection, and focus foundation", () => {
    expect(styles).toMatch(/body\s*{[\s\S]*var\(--orvauxe-text-primary\)/);
    expect(styles).toMatch(/body\s*{[\s\S]*var\(--orvauxe-surface-primary\)/);
    expect(styles).toMatch(/::selection\s*{[\s\S]*var\(--orvauxe-surface-accent\)/);
    expect(styles).toMatch(/:focus-visible\s*{[\s\S]*var\(--orvauxe-focus-ring\)/);
    expect(styles).not.toMatch(/#[\da-f]{3,8}\b/i);
    expect(styles).not.toContain("overflow-x: hidden");
  });

  it("removes non-essential animation for reduced-motion users", () => {
    expect(styles).toMatch(/@media \(prefers-reduced-motion: reduce\)/);
    expect(styles).toContain("animation: none !important");
    expect(styles).toContain("transition: none !important");
  });
});
