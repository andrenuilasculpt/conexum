import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** La demo no se indexa salvo NEXT_PUBLIC_INDEXABLE=true. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
