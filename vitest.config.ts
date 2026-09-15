import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    clearMocks: true,
    coverage: {
      ...configDefaults.coverage,
      provider: "v8",
      enabled: true,
      exclude: ["**/dist-*/**"],
    },
    exclude: [...configDefaults.exclude, "**/dist-*/**"],
  },
});
