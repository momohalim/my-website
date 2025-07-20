export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | "always"
    | "hourly"
    | "daily"
    | "weekly"
    | "monthly"
    | "yearly"
    | "never";
  priority?: number;
}

export const generateSitemap = (urls: SitemapUrl[]): string => {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://highagenycollective.com";

  const sitemapUrls = urls
    .map((url) => {
      const fullUrl = url.loc.startsWith("http")
        ? url.loc
        : `${baseUrl}${url.loc}`;
      const lastmod = url.lastmod || new Date().toISOString().split("T")[0];

      return `  <url>
    <loc>${fullUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${url.changefreq || "monthly"}</changefreq>
    <priority>${url.priority || 0.5}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</urlset>`;
};

export const getSitemapUrls = (): SitemapUrl[] => {
  return [
    {
      loc: "/",
      changefreq: "weekly",
      priority: 1.0,
    },
    {
      loc: "/about",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: "/services",
      changefreq: "monthly",
      priority: 0.9,
    },
    {
      loc: "/transform",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      loc: "/contact",
      changefreq: "monthly",
      priority: 0.7,
    },
  ];
};

// Function to generate and download sitemap (for build process)
export const downloadSitemap = (): void => {
  const urls = getSitemapUrls();
  const sitemapContent = generateSitemap(urls);

  const blob = new Blob([sitemapContent], { type: "application/xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "sitemap.xml";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
