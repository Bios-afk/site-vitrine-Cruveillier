import { defineConfig, fontProviders } from "astro/config";
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
  site: "https://avocat-cruveiller.fr",
  trailingSlash: "never",
  integrations: [react()],
  // Self-hosted via Astro's Fonts API instead of a render-blocking
  // <link> to fonts.googleapis.com. latin-ext is required (not just
  // latin) so accented French characters (é, è, ï, œ, ç…) are covered.
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Poppins",
      cssVariable: "--font-poppins",
      weights: [300, 400, 500, 600, 700, 800, 900],
      styles: ["normal"],
      subsets: ["latin", "latin-ext"],
    },
  ],
});
