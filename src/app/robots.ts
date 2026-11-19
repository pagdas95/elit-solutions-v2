import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const indexable = process.env.ALLOW_INDEXING === "true" && process.env.CONTEXT === "production";

export default function robots(): MetadataRoute.Robots {
  return indexable
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
