import reactConfig from "@orvauxe/eslint-config/react";

export default [
  ...reactConfig,
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "@orvauxe/web", message: "Studio must not depend on the web application." },
            { name: "posthog-js", message: "Use @orvauxe/analytics/client." },
            { name: "posthog-node", message: "Use @orvauxe/analytics/server." },
          ],
          patterns: [
            {
              group: [
                "apps/**",
                "**/apps/**",
                "../web",
                "../web/**",
                "@orvauxe/web/**",
                "posthog-js/**",
                "posthog-node/**",
              ],
              message: "Studio must not depend on the web application.",
            },
          ],
        },
      ],
    },
  },
];
