import baseConfig from "@orvauxe/eslint-config/base";

export default [
  ...baseConfig,
  {
    files: ["src/client.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: ["posthog-node", "server-only", "node:crypto"],
          patterns: ["apps/**", "**/apps/**"],
        },
      ],
    },
  },
  {
    files: ["src/events.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: ["posthog-js", "posthog-node", "server-only"],
          patterns: ["apps/**", "**/apps/**"],
        },
      ],
    },
  },
  {
    files: ["src/server.ts"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: ["posthog-js"],
          patterns: ["apps/**", "**/apps/**"],
        },
      ],
    },
  },
];
