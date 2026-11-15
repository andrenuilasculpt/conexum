import type { MetadataRoute } from "next";

/** Crawlers de entrenamiento de IA: sin acceso (el bloqueo efectivo lo aplica el Firewall de Vercel). */
const AI_BOTS = ["GPTBot","ClaudeBot","anthropic-ai","Claude-Web","CCBot","Bytespider","Meta-ExternalAgent","meta-externalfetcher","FacebookBot","Amazonbot","cohere-ai","cohere-training-data-crawler","Diffbot","Omgilibot","ImagesiftBot","Timpibot","PanguBot","AI2Bot","Google-Extended","Applebot-Extended","Webzio-Extended"];
import { siteConfig } from "@/config/site";

/** La demo no se indexa salvo NEXT_PUBLIC_INDEXABLE=true. */
export default function robots(): MetadataRoute.Robots {
  if (!siteConfig.indexable) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: AI_BOTS, disallow: "/" }, { userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
