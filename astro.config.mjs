import { defineConfig } from "astro/config";
import react from "@astrojs/react";
export default defineConfig({
  site: "https://bold-performance.vercel.app",
  integrations: [react()],
});
