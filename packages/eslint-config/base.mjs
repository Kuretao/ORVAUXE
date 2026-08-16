import eslint from "@eslint/js";
import importPlugin from "eslint-plugin-import-x";
import globals from "globals";
import tseslint from "typescript-eslint";

const baseConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/coverage/**",
      "**/dist/**",
      "**/node_modules/**",
      "**/playwright-report/**",
      "**/test-results/**",
      "**/*.generated.*",
      "**/schema.json",
      "**/src/generated/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "import-x": importPlugin,
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-explicit-any": "error",
      "import-x/no-cycle": ["error", { ignoreExternal: true }],
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-restricted-imports": [
        "error",
        {
          paths: [
            { name: "posthog-js", message: "Use @orvauxe/analytics/client." },
            { name: "posthog-node", message: "Use @orvauxe/analytics/server." },
          ],
          patterns: [
            {
              group: ["apps/**", "**/apps/**"],
              message: "Workspace packages must never import from applications.",
            },
            {
              group: ["posthog-js/**", "posthog-node/**"],
              message: "Use the isolated @orvauxe/analytics entrypoints.",
            },
          ],
        },
      ],
    },
  },
];

export default baseConfig;
