// @ts-check
import { defineConfig } from "astro/config";
import linaria from "@wyw-in-js/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [react({ include: ["**/react/*"] })],
  vite: { plugins: [linaria()] },
  site: "https://appleicat.github.io",
  base: "/astro-pokemon",
});
