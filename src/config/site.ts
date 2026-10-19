/**
 * Configuración central del sitio.
 * Todo lo que deba cambiar sin tocar componentes vive aquí: correo, logotipo,
 * navegación, modo del formulario y avisos legales.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
}

export type NavItem = { href: string; label: string };

export const siteConfig = {
  name: "CONEXUM",
  url: resolveSiteUrl(),
  /** La demo no se indexa salvo que NEXT_PUBLIC_INDEXABLE === "true". */
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
  title: "CONEXUM | Ingeniería de Redes, Infraestructura y Telecomunicaciones",
  description:
    "Ingeniería especializada en redes corporativas, SD-WAN, Cisco Meraki, monitorización, ciberseguridad y servicios tecnológicos B2B.",
  locale: "es_ES",

  /**
   * Correo PROVISIONAL. No afirmar en ningún texto que el buzón está operativo.
   * Cambiar aquí cuando exista el definitivo.
   */
  contactEmail: "info@conexum.one",
  contactEmailIsProvisional: true,

  /**
   * LOGO PLACEHOLDER · REEMPLAZAR
   * Sustituir public/brand/conexum-logo.svg por el logotipo aprobado
   * (mismo nombre de archivo) o cambiar esta ruta.
   */
  logoSrc: "/brand/conexum-logo.svg",
  logoWidth: 150,
  logoHeight: 28,

  /** OG PLACEHOLDER · REEMPLAZAR (1200 × 630). */
  ogImage: "/og/conexum-og.png",

  /**
   * "demo": valida en cliente y muestra una confirmación honesta sin enviar nada.
   * "api": envía a /api/contact (requiere completar la integración en el servidor).
   */
  contactFormMode: "demo" as "demo" | "api",

  region: "España",

  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/servicios", label: "Servicios" },
    { href: "/contacto", label: "Contacto" },
  ] as NavItem[],

  primaryCta: { href: "/contacto", label: "Hablemos de su infraestructura" },

  /** Tecnologías citadas solo en texto. Sin logotipos de terceros. */
  technologies: ["Cisco Catalyst", "Cisco Nexus", "Cisco Meraki", "Cisco SD-WAN", "Cisco ISE", "ThousandEyes", "Splunk"],

  legalLinks: [
    { href: "/legal#aviso-legal", label: "Aviso legal" },
    { href: "/legal#privacidad", label: "Privacidad" },
    { href: "/legal#cookies", label: "Cookies" },
  ] as NavItem[],

  trademarkNotice:
    "Cisco, Meraki, ThousandEyes y Splunk son marcas de sus respectivos titulares. Su mención describe experiencia técnica y no implica relación comercial, certificación ni partnership con dichos fabricantes.",

  footerSummary:
    "Ingeniería de redes, operación y soporte especializado para infraestructuras de misión crítica. Servicio remoto para organizaciones y partners en España.",

  copyright: "© 2026 CONEXUM · Demo comercial",
};
