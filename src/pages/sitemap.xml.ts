import type { APIRoute } from "astro";

export const prerender = true;

const BASE_URL = "https://nextlevelmentors.show";

type Entry = { url: string; priority: number; changefreq: string };

const allPages: Entry[] = [
  { url: "/", priority: 1.0, changefreq: "monthly" },
  { url: "/contact", priority: 0.6, changefreq: "monthly" },
  { url: "/conditions-generales", priority: 0.3, changefreq: "yearly" },
  { url: "/privacy", priority: 0.3, changefreq: "yearly" },
  { url: "/terms", priority: 0.3, changefreq: "yearly" },
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
