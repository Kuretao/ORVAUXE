import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const directory = path.dirname(fileURLToPath(import.meta.url));
const publicModules = ["atelier", "editions", "home", "legal", "project-inquiry", "studio"];

export default defineConfig({
  oxc: {
    jsx: {
      runtime: "automatic",
    },
  },
  resolve: {
    alias: [
      ...publicModules.map((moduleName) => ({
        find: new RegExp(`^@/modules/${moduleName}$`),
        replacement: path.resolve(directory, `src/modules/${moduleName}/public.ts`),
      })),
      { find: "@", replacement: path.resolve(directory, "src") },
    ],
  },
  test: {
    environment: "node",
    exclude: ["tests/e2e/**", "node_modules/**"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
