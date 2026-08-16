import reactConfig from "@orvauxe/eslint-config/react";

export default [
  ...reactConfig,
  {
    files: ["src/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            "apps/**",
            "**/apps/**",
            "@orvauxe/web",
            "@orvauxe/analytics",
            "@orvauxe/analytics/**",
            "next",
            "next/**",
            "@/infrastructure/**",
            "@/modules/**",
            "@sanity/**",
            "next-sanity",
            "next-sanity/**",
            "attio",
            "attio/**",
            "@attio/**",
            "resend",
            "resend/**",
            "@sentry/**",
            "gsap",
            "gsap/**",
            "posthog-js",
            "posthog-js/**",
            "posthog-node",
            "posthog-node/**",
          ],
        },
      ],
    },
  },
];
