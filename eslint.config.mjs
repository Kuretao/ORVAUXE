import baseConfig from "@orvauxe/eslint-config/base";

export default [
  ...baseConfig,
  {
    ignores: ["apps/**", "packages/**", ".next/**", "dist/**"],
  },
];
