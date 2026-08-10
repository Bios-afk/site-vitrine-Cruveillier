import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";

export default defineConfig({
  // Server output so sitemap.xml.ts can be an on-demand route, while pages
  // that opt into `prerender = true` are still statically generated.
  output: "static",
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  site: "https://nextlevelmentors.show",
  trailingSlash: "never",
  integrations: [react()],
});
