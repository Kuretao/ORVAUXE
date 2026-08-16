import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

const packageRoot = new URL("../", import.meta.url);
const css = await readFile(new URL("src/tokens.css", packageRoot), "utf8");
const entrypoint = await readFile(new URL("src/index.ts", packageRoot), "utf8");
const packageJson = JSON.parse(await readFile(new URL("package.json", packageRoot), "utf8"));

const brandPalette = {
  "--orvauxe-black": "#0b0b0b",
  "--atelier-ivory": "#f2efe8",
  "--bone": "#d8d2c7",
  "--graphite-brand": "#74716b",
  "--graphite-ui": "#6f6c66",
  "--oxblood": "#421817",
};

const typographyRoles = [
  "display-xl",
  "display-lg",
  "heading-xl",
  "heading-lg",
  "heading-md",
  "heading-sm",
  "body-lg",
  "body-md",
  "body-sm",
  "label",
  "caption",
];

function relativeLuminance(hex) {
  const channels = hex
    .slice(1)
    .match(/../g)
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));

  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function contrastRatio(first, second) {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);

  return (
    (Math.max(firstLuminance, secondLuminance) + 0.05) /
    (Math.min(firstLuminance, secondLuminance) + 0.05)
  );
}

test("the approved six-color palette is exact and has one raw source", () => {
  for (const [token, value] of Object.entries(brandPalette)) {
    assert.match(css, new RegExp(`${token}:\\s*${value};`, "i"));
    assert.equal(css.match(new RegExp(value, "gi"))?.length, 1);
  }

  assert.equal(css.match(/#[\da-f]{3,8}\b/gi)?.length, 6);
  assert.doesNotMatch(entrypoint, /#[\da-f]{3,8}\b/i);
});

test("light and dark contexts expose the complete semantic color contract", () => {
  const semanticTokens = [
    "surface-primary",
    "surface-secondary",
    "surface-inverse",
    "surface-accent",
    "text-primary",
    "text-secondary",
    "text-inverse",
    "text-on-accent",
    "border-subtle",
    "border-default",
    "border-strong",
    "accent-primary",
    "accent-hover",
    "accent-contrast",
    "focus-ring",
  ];

  assert.match(css, /:root,\s*\[data-theme="light"\]\s*{/);
  assert.match(css, /\[data-theme="dark"\]\s*{/);

  for (const token of semanticTokens) {
    assert.equal(
      css.match(new RegExp(`--orvauxe-${token}:`, "g"))?.length,
      2,
      `${token} must be assigned once per surface context`,
    );
    assert.match(css, new RegExp(`--color-${token}:\\s*var\\(--orvauxe-${token}\\);`));
  }
});

test("approved semantic text and focus pairs meet their WCAG contrast roles", () => {
  assert.ok(contrastRatio("#0b0b0b", "#f2efe8") >= 4.5);
  assert.ok(contrastRatio("#6f6c66", "#f2efe8") >= 4.5);
  assert.ok(contrastRatio("#f2efe8", "#0b0b0b") >= 4.5);
  assert.ok(contrastRatio("#d8d2c7", "#0b0b0b") >= 4.5);
  assert.ok(contrastRatio("#f2efe8", "#421817") >= 4.5);
  assert.ok(contrastRatio("#421817", "#f2efe8") >= 3);
});

test("every typography role has a complete semantic tuple", () => {
  const properties = ["family", "size", "line-height", "letter-spacing", "weight"];

  for (const role of typographyRoles) {
    for (const property of properties) {
      assert.match(css, new RegExp(`--orvauxe-type-${role}-${property}:`));
    }
    assert.match(css, new RegExp(`--text-${role}:\\s*var\\(--orvauxe-type-${role}-size\\)`));
  }

  assert.match(css, /--font-orvauxe-display,/);
  assert.match(css, /--font-orvauxe-interface,/);
  assert.doesNotMatch(css, /--font-orvauxe-(?:display|interface):/);
});

test("layout, motion, focus, and reduced-motion contracts are present", () => {
  assert.match(css, /--orvauxe-grid-columns-mobile:\s*4;/);
  assert.match(css, /--orvauxe-grid-columns-tablet:\s*8;/);
  assert.match(css, /--orvauxe-grid-columns-desktop:\s*12;/);
  assert.match(css, /@media \(min-width: 48rem\)/);
  assert.match(css, /@media \(min-width: 64rem\)/);
  assert.match(css, /--breakpoint-sm:\s*30rem;/);
  assert.match(css, /--breakpoint-md:\s*48rem;/);
  assert.match(css, /--breakpoint-lg:\s*64rem;/);
  assert.match(css, /--breakpoint-xl:\s*90rem;/);
  assert.doesNotMatch(css, /--breakpoint-[a-z]+:\s*var\(/);
  assert.match(css, /--orvauxe-target-min:\s*2\.75rem;/);
  assert.match(css, /--spacing-target-min:\s*var\(--orvauxe-target-min\);/);

  for (const name of ["page", "editorial", "text", "full-bleed"]) {
    assert.match(css, new RegExp(`--orvauxe-container-${name}:`));
  }
  for (const name of ["instant", "fast", "standard", "editorial", "cinematic"]) {
    assert.match(css, new RegExp(`--orvauxe-motion-${name}:`));
  }
  for (const name of ["standard", "enter", "exit", "editorial"]) {
    assert.match(css, new RegExp(`--orvauxe-ease-${name}:`));
  }

  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(css, /--orvauxe-motion-cinematic:\s*0ms;/);
  assert.match(css, /--orvauxe-focus-width:/);
  assert.match(css, /--orvauxe-z-skip-link:/);
});

test("the package stays React-independent and dependency-free at runtime", async () => {
  assert.equal(packageJson.dependencies, undefined);
  assert.equal(packageJson.peerDependencies, undefined);

  const dependencyNames = Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  });
  assert.equal(
    dependencyNames.some((name) => name === "react" || name.startsWith("react/")),
    false,
  );

  const sourceFiles = await readdir(new URL("src/", packageRoot));
  for (const sourceFile of sourceFiles) {
    const source = await readFile(new URL(`src/${sourceFile}`, packageRoot), "utf8");
    assert.doesNotMatch(
      source,
      /(?:from\s+|import\s+|import\s*\(\s*|require\s*\(\s*)["']react(?:\/[^"']*)?["']/,
    );
  }
});
