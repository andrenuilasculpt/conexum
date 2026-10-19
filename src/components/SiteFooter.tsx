import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { BrandLogo } from "./BrandLogo";
import { TextLink } from "./ui/Primitives";

const footLink = "text-sm text-muted transition-colors hover:text-ink";
const footHeading = "font-mono text-[11px] tracking-[0.16em] text-grey uppercase";

export function SiteFooter() {
  return (
    <footer className="border-t border-grey/15 bg-abyss">
      <div className="container-x flex flex-col gap-14 pb-8 pt-[72px]">
        <div className="grid grid-fit-220 gap-x-12 gap-y-10">
          <div className="flex flex-col gap-5">
            <BrandLogo className="self-start" />
            <p className="max-w-[300px] text-sm leading-relaxed text-muted">{siteConfig.footerSummary}</p>
          </div>

          <nav aria-label="Pie de página" className="flex flex-col gap-4">
            <p className={footHeading}>Navegación</p>
            <ul className="flex flex-col gap-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link className={footLink} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <p className={footHeading}>Servicios</p>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.id}>
                  <Link className={footLink} href={`/servicios#${s.id}`}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <p className={footHeading}>Contacto</p>
            <a href={`mailto:${siteConfig.contactEmail}`} className="text-[17px] font-semibold text-ink">
              {siteConfig.contactEmail}
            </a>
            {siteConfig.contactEmailIsProvisional && (
              <p className="font-mono text-[11px] leading-relaxed tracking-[0.08em] text-grey">CORREO PROVISIONAL · CONFIGURABLE</p>
            )}
            <TextLink href={siteConfig.primaryCta.href} className="self-start">
              {siteConfig.primaryCta.label}
            </TextLink>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-grey/15 pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 text-[13px] text-grey">
            <p>{siteConfig.copyright}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {siteConfig.legalLinks.map((l) => (
                <li key={l.href}>
                  <a className="text-[13px] text-muted transition-colors hover:text-ink" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <p className="max-w-[860px] text-xs leading-relaxed text-faint">{siteConfig.trademarkNotice}</p>
        </div>
      </div>
    </footer>
  );
}
