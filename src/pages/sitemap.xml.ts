import type { APIRoute } from "astro";
import details from "../components/data/details.json";

export const prerender = true;

const BASE_URL = "https://nextlevelmentors.show";

type Entry = { url: string; priority: number; changefreq: string };

// Primary nav pages.
const navPages: Entry[] = [
  { url: "/", priority: 1.0, changefreq: "daily" },
  { url: "/podcast", priority: 0.9, changefreq: "weekly" },
  { url: "/articles", priority: 0.9, changefreq: "weekly" },
  { url: "/shows", priority: 0.9, changefreq: "weekly" },
];

// Content & utility pages that have real routes.
const contentPages: Entry[] = [
  { url: "/about", priority: 0.7, changefreq: "monthly" },
  { url: "/mentors", priority: 0.8, changefreq: "weekly" },
  { url: "/events", priority: 0.8, changefreq: "weekly" },
  { url: "/stories", priority: 0.7, changefreq: "weekly" },
  { url: "/nearyou", priority: 0.6, changefreq: "weekly" },
  { url: "/search", priority: 0.5, changefreq: "monthly" },
  { url: "/get-started", priority: 0.8, changefreq: "monthly" },
  { url: "/contact", priority: 0.6, changefreq: "monthly" },
  { url: "/support", priority: 0.6, changefreq: "monthly" },
  { url: "/account", priority: 0.4, changefreq: "monthly" },
  { url: "/privacy", priority: 0.3, changefreq: "yearly" },
  { url: "/terms", priority: 0.3, changefreq: "yearly" },
];

// Additional registered pages requested in the brief (sitemap-only).
const extraPages: Entry[] = [
  { url: "/shop", priority: 0.7, changefreq: "weekly" },
  { url: "/diagnostics", priority: 0.5, changefreq: "monthly" },
  { url: "/cart", priority: 0.3, changefreq: "monthly" },
];

// Detail pages, derived from the centralized data (kept in sync automatically).
const detailPages: Entry[] = [
  ...Object.keys(details.shows).map((slug) => ({
    url: `/shows/${slug}`,
    priority: 0.8,
    changefreq: "monthly",
  })),
  ...Object.keys(details.podcast).map((slug) => ({
    url: `/podcast/${slug}`,
    priority: 0.8,
    changefreq: "monthly",
  })),
  ...Object.keys(details.articles).map((slug) => ({
    url: `/articles/${slug}`,
    priority: 0.8,
    changefreq: "monthly",
  })),
];

const allPages: Entry[] = [
  ...navPages,
  ...contentPages,
  ...extraPages,
  ...detailPages,
];
const today = new Date().toISOString().split("T")[0];

export const GET: APIRoute = async () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${BASE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
