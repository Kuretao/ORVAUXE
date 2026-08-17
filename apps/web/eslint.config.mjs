import nextConfig from "@orvauxe/eslint-config/next";
const moduleNames = ["atelier", "editions", "home", "legal", "project-inquiry", "studio"];
const relativeCrossModulePatterns = moduleNames.flatMap((name) =>
  ["..", "../..", "../../..", "../../../..", "../../../../.."].flatMap((prefix) => [
    `${prefix}/${name}`,
    `${prefix}/${name}/**`,
  ]),
);
const relativeModulePrivatePatterns = [
  "..",
  "../..",
  "../../..",
  "../../../..",
  "../../../../..",
].flatMap((prefix) => [`${prefix}/modules/*/*`, `${prefix}/modules/*/*/**`]);

const vendorPaths = [
  { name: "posthog-js", message: "Use @orvauxe/analytics/client." },
  { name: "posthog-node", message: "Use @orvauxe/analytics/server." },
];

const boundaryPatterns = [
  { group: ["apps/**", "packages/**"], message: "Use a workspace package entrypoint." },
  {
    group: ["posthog-js/**", "posthog-node/**"],
    message: "Use the isolated @orvauxe/analytics entrypoints.",
  },
  {
    regex: "^@/modules/[^/]+/(?!server$).+",
    message: "Import another module only through its public API.",
  },
  {
    group: [...relativeCrossModulePatterns, ...relativeModulePrivatePatterns],
    message: "Cross-module relative imports are forbidden; use the module public alias.",
  },
];

const restrictedImports = (pathNames = [], patternGroups = []) => [
  "error",
  {
    paths: [
      ...vendorPaths,
      ...pathNames.map((name) => ({ name, message: "This entrypoint is not available here." })),
    ],
    patterns: [
      ...boundaryPatterns,
      ...patternGroups.map((group) => ({
        group: [group],
        message: "This architectural dependency is not available here.",
      })),
    ],
  },
];

const architectureRules = {
  "no-restricted-imports": restrictedImports(),
  "no-restricted-properties": [
    "error",
    {
      object: "process",
      property: "env",
      message: "Read environment variables through src/config.",
    },
  ],
};

const eslintConfig = [
  ...nextConfig,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      ...architectureRules,
      "no-console": "error",
    },
  },
  {
    files: ["src/infrastructure/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrictedImports(
        [],
        ["@/modules/**", "**/modules/**", "@orvauxe/ui", "react", "react/**"],
      ),
    },
  },
  {
    files: ["src/modules/*/ui/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": restrictedImports(
        [
          "@orvauxe/analytics/server",
          "@sanity/client",
          "attio",
          "next-sanity",
          "resend",
          "server-only",
        ],
        [
          "@/infrastructure/**",
          "**/infrastructure/**",
          "**/*.server",
          "**/*.server.*",
          "@/modules/*/server",
          "@sanity/**",
          "@attio/**",
          "attio/**",
          "next-sanity/**",
          "resend/**",
        ],
      ),
    },
  },
  {
    files: [
      "src/**/*.client.{ts,tsx}",
      "src/instrumentation-client.ts",
      "src/app/error.tsx",
      "src/app/global-error.tsx",
      "src/app/**/error.tsx",
    ],
    rules: {
      "no-restricted-imports": restrictedImports(
        ["@orvauxe/analytics/server", "server-only"],
        [
          "**/*.server",
          "**/*.server.*",
          "@/modules/*/server",
          "@/config/env.server",
          "@/infrastructure/**",
          "**/infrastructure/**",
        ],
      ),
    },
  },
  {
    files: [
      "src/config/env.client.ts",
      "src/config/env.server.ts",
      "src/config/site.ts",
      "src/instrumentation.ts",
      "src/instrumentation-client.ts",
    ],
    rules: {
      "no-restricted-properties": "off",
    },
  },
  {
    files: ["**/*.test.{ts,tsx}", "tests/**/*.ts"],
    rules: {
      "no-console": "off",
    },
  },
];

export default eslintConfig;
