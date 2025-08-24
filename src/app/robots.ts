import type { MetadataRoute } from "next";

const SITE_URL = "https://tempmailr.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // allow all main pages
        disallow: [
          "/admin",
          "/api",
          "/_next",
          "/temp",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
